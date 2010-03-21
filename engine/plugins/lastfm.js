jQuery.lastfm = {
    add:function(container, geoData){
        var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20lastfm.geo.getevents%20where%20api_key%3D%225141317b1b9c2d30fa50ccebcd2d96a2%22%20and%20lat%3D%22{{latitude}}%22%20and%20long%3D%22{{longitude}}%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?";

        var myIpUrl = url.replace('{{latitude}}', geoData.query.results.Response.Latitude)
                         .replace('{{longitude}}', geoData.query.results.Response.Longitude);

        $.ajax({
            url: myIpUrl,
            dataType: 'jsonp',
            success: function(data) {
                console.debug(data);
            }
        });
    }
}
