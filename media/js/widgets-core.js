var errorTemplate = '<div style="padding: 0pt 0.7em;" class="ui-state-error ui-corner-all">';
errorTemplate += '    <p><span style="float: left; margin-right: 0.3em;" class="ui-icon ui-icon-alert"></span>';
errorTemplate += '    <strong>Alerta:</strong> {{message}}</p>';
errorTemplate += '</div>';

var geoIp = {
    "query":{
        "count":"1",
        "created":"2010-03-20T05:33:16Z",
        "lang":"en-US",
        "updated":"2010-03-20T05:33:16Z",
        "uri":"http://query.yahooapis.com/v1/yql?q=select+*+from+ip.location+where+ip%3D%27200.159.32.100%27",
        "results":{
            "Response":{
                "Ip":"200.159.32.100",
                "Status":"OK",
                "CountryCode":"BR",
                "CountryName":"Brazil",
                "RegionCode":"27",
                "RegionName":"Sao Paulo",
                "City":"São Paulo",
                "ZipPostalCode":null,
                "Latitude":"-23.5333",
                "Longitude":"-46.6167",
                "Timezone":"-3",
                "Gmtoffset":"-2",
                "Dstoffset":"-3"
            }
        }
    }
}

//Para obter mais informacões geográficas
//http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20google.geocoding%20where%20q%3D%22-23.5333%2C-46.6167%22&format=json&diagnostics=false&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=cbfunc

jQuery.widgets = {
    tabCounter:0,
    init: function(options){
        _self = this;
        ip = options.ip;

        $('.errors').hide();

        $('#widgets-area').tabs({
            tabTemplate: '<li><a href="#{href}" style="float:left;">#{label}</a><span id="close-#{href}" class="ui-icon ui-icon-close" style="float:left; margin: 10px 10px 0px -12px;">Remove Tab</span></li>',
            add: function(event, ui) {
                $(ui.panel).append('<div>Loading...</p>');
            }
        });

        _self.bindAvailableWidgets(options.availableWidgets);
    },
    bindAvailableWidgets: function(availableWidgets){
        var _self = this;
        $.each(availableWidgets, function(item){
            var widget = this;

            var $widget = $('<li>');
            var $link = $('<a>');
            $link.attr('js_url', widget.js_url)
                .attr('html_url', widget.html_url)
                .attr('href', 'javascript:;')
                .attr('title', widget.description)
                .attr('slug', widget.slug)
                .addClass('widget')
                .html(widget.name)
                .appendTo($widget);

            $('div.available-widgets').find('div.widgets').find('ul').append($widget);

            $("a.widget", $widget).click(function(){
                $('.errors').hide();
                var $a = $(this);
                _self.loadWidget($a);
                return false;
            });

        });
    },
    loadWidget: function(link){
        var _self = this;

        $.ajax({
            url: link.attr('html_url'),
            success: function(data){
                $tabs = $('#widgets-area');
                var $container = $('<div class="widget"></div>');
                $container.append(data);

                var key = '#tabs-' + _self.tabCounter;
                $tabs.tabs('add', key, link.html());
                $tabs.tabs('select', _self.tabCounter);

                _self.tabCounter++;

                $(key).html($container);

                $('span.ui-icon.ui-icon-close').unbind('click').bind('click', function(){
                    var button = $(this);
                    var tabIndex = $('li',$tabs).index(button.parent());

                    $tabs.tabs('remove', tabIndex);
                    _self.tabCounter--;
                });


                $.ajax({
                    url: link.attr('js_url'),
                    dataType: 'script',
                    success: function(data){
                        var widgetObject = $[link.attr('slug')];
                        widgetObject.add($container, geoIp);
                    }
                });
            },
            error: function(xmlHttpRequest, message, exception){
                $('.errors').html(errorTemplate.replace('{{message}}', 'O widget n&atilde;o p&ocirc;de ser inserido com sucesso'));
                $('.errors').show();
            }
        });
    }
};

