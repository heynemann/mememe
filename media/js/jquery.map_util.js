(function($) {
    $.fn.maps_search = function($container, query, lat, lon, zoom, satellite, theQuery) {
        var make_iframe = function() {
            return '<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" '
                + 'src="http://maps.google.com/maps?'+(theQuery?query[1]:'q='+query+'+loc:'+lat+','+lon)+'&amp;ie=UTF8&amp;ll='+lat+','+lon 
                + '&amp;z='+zoom+'&t='+(satellite?'k':'m')+'&amp;output=embed">'
                + '</iframe>';
        }

        var search_for = function(query) {
            $container.empty()/*.append(input())*/.append("<br/>").append(
                make_iframe(query));
        }

        // var input  = function() {
        //     return $("<input type='text'>").enterpress(function() {
        //         search_for($(this).attr("value"));
        //     }).attr("value", theQuery?query[0]:query)
        // }

        search_for(query);
    }
})(jQuery)
