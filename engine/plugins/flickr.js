jQuery.flickr = {
    add: function(container, geoData)
    {
        var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20flickr.photos.search%20where%20tags%3D%22{{tags}}%22%20%20or%20(lat%3D%22{{latitude}}%22%20and%20lon%3D%22{{longitude}}%22)&format=xml&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?";

        var myIpUrl = url
            .replace('{{latitude}}', geoData.query.results.Response.Latitude)
            .replace('{{longitude}}', geoData.query.results.Response.Longitude)
            .replace("{{tags}}", geoData.query.results.Response.City);

        $.ajax({
            url: myIpUrl,

            dataType: 'jsonp',

            success: function(data) {
                var ul = $("<ul />");
                $.each(data.results, function() {
                    var d = $(String(this));

                    /* Crappy concatenation... how I'd like to se result
                     * formating %s stuff... */
                    var thumb = "http://farm" + d.attr("farm") +
                        ".static.flickr.com/" + d.attr("server")+
                        "/"+d.attr("id")+"_"+d.attr("secret")+
                        "_t.jpg'";

                    var photo = "http://farm"+d.attr("farm")+
                        ".static.flickr.com/"+d.attr("server")+
                        "/"+d.attr("id")+"_"+d.attr("secret")+
                        ".jpg'";

                    var li = $("<li><a href='"+photo+
                        "' title='"+d.attr("title")+"'><img src='"+thumb+
                        "' width='72' height='72' alt='" + d.attr("title") +
                        "' /></a>" + d.attr("title") + "</li>");
                    ul.append(li);
                });

                $('#flickr', container).append(ul);
                $('#flickr a').lightBox();
            }
        });
    }
};
