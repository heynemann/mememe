jQuery.geoMap = {
    add:function(container, geoData){
        var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20maps.map%20where%20latitude%3D%22{{latitude}}%22%20and%20longitude%3D%22{{longitude}}%22%0A%0Aand%20zoom%3D2%0A%0A&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?";

        var myIpUrl = url.replace('{{latitude}}', geoData.query.results.Response.Latitude)
                         .replace('{{longitude}}', geoData.query.results.Response.Longitude);

        $.ajax({
            url: myIpUrl,
            dataType: 'jsonp',
            success: function(data) {
                $img = $('<div class="map"><img src="' + data.query.results.Result.content + '" /></div><div class="updated">' + data.query.updated + '</div>');
                $('#my-map', container).append($img);
            }
        });
    }
}
