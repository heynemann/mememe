jQuery.widgets = {
    init: function(options){
        _self = this;

        $("a.widget").click(function(){
            var $a = $(this);
            var url = $a.attr('href');

            _self.loadWidget(url);

            return false;
        });
    },
    loadWidget: function(widgetName){
        var htmlUrl = 'widgets/' + widgetName + '.html';
        var jsUrl = 'widgets/' + widgetName + '.js';

        $.get(htmlUrl, {}, function(data){
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
        });
    }
};

