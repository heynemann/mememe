(function($) {
    $.fn.maps_search = function($container, query, lat, lon, zoom, satellite) {
        var make_iframe = function(query) {
            return '<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" '
                + 'src="http://maps.google.com/maps?q='+query+'+loc:'+lat+','+lon+'&amp;ie=UTF8&amp;ll='+lat+','+lon 
                + '&amp;z='+zoom+'&t='+(satellite?'k':'m')+'&amp;output=embed">'
                + '</iframe>';
        }

        var search_for = function(query) {
            $container.empty().append(input(query)).append("<br/>").append(
                make_iframe(query));
        }

        var input  = function(val) {
            return $("<input type='text'>").enterpress(function() {
                search_for($(this).attr("value"));
            }).attr("value", val)
        }

        search_for(query);
    }
})(jQuery)
