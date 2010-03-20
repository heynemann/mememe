var errorTemplate = '<div style="padding: 0pt 0.7em;" class="ui-state-error ui-corner-all">';
errorTemplate += '    <p><span style="float: left; margin-right: 0.3em;" class="ui-icon ui-icon-alert"></span>';
errorTemplate += '    <strong>Alerta:</strong> {{message}}</p>';
errorTemplate += '</div>';

jQuery.widgets = {
    init: function(options){
        _self = this;
        $('.errors').hide();

        _self.bindAvailableWidgets(options.availableWidgets);
    },
    bindAvailableWidgets: function(availableWidgets){
        $.each(availableWidgets, function(item){
            var widget = this;

            var $widget = $('<li><a href="' + widget.url + '" alt="' + widget.description + '" class="widget">' + widget.name + '</a></li>');
            $('div.available-widgets').find('div.widgets').find('ul').append($widget);

            $("a.widget", $widget).click(function(){
                $('.errors').hide();
                var $a = $(this);
                var url = $a.attr('href');

                _self.loadWidget(url);

                return false;
            });

        });
    },
    loadWidget: function(widgetName){
        var htmlUrl = 'widgets/' + widgetName + '.html';
        var jsUrl = 'widgets/' + widgetName + '.js';

        $.ajax({
            url: htmlUrl,
            success: function(data){
                var $container = $('<div class="widget"></div>');

                $container.append(data);

                $('#widgets-area').append($container);

                $.ajax({
                    url: jsUrl,
                    dataType: 'script',
                    success: function(data){
                        var widgetObject = $[widgetName];
                        widgetObject.add($container);
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

