jQuery.flickr = {
    add:function(container, geoData){
        var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20flickr.photos.search%20where%20tags%3D%22{{tags}}%22%20%20or%20(lat%3D%22{{latitude}}%22%20and%20lon%3D%22{{longitude}}%22)&format=xml&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?";

        var myIpUrl = url.replace('{{latitude}}', geoData.query.results.Response.Latitude)
                         .replace('{{longitude}}', geoData.query.results.Response.Longitude)
                         .replace("{{tags}}", geoData.query.results.Response.City)

        $.ajax({
            url: myIpUrl,
            dataType: 'jsonp',
            success: function(data) {
                $.each(data.results, function() {
                    var d = $(String(this))
                    $img = $("<div class='flickr-img'>"
                             + "<div class='flickr-title'>"
                             + d.attr("title")+"</div>"
                             + "<img alt='"+d.attr("title")+"' title='"+d.attr("title")+"' src='" 
                             + "http://farm"+d.attr("farm")+".static.flickr.com/"+d.attr("server")+"/"+d.attr("id")+"_"+d.attr("secret")+".jpg'/>"
                             + "</div>");
                    $('#flickr', container).append($img);
                })
            }
        });
    }
}
