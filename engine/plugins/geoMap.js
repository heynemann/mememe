jQuery.geoMap = {
    add:function(container, geoData){
        $.yql(
            "SELECT * FROM maps.map WHERE latitude=#{latitude} AND longitude=#{longitude} AND zoom=2",
            {
                latitude: geoData.query.results.Response.Latitude,
                longitude: geoData.query.results.Response.Longitude,
            },
            function (data) {
                $img = $('<div class="map"><img src="' + data.query.results.Result.content + '" /></div><div class="updated">' + data.query.updated + '</div>');
                $('#my-map', container).append($img);
              }
        );
    }
}
