jQuery.twitter = {
    add: function(container, geoData){
        var url = "http://search.twitter.com/search.json?geocode=" 
                      + geoData.query.results.Response.Latitude + ","
                      + geoData.query.results.Response.Longitude + ",10km"


        var ct = $(".content", container);

        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(data) {
                var tweets = data.results;
                
                $.each(tweets, function() {
                    var sp1 = "<span class='entry-content'><a href='http://twitter.com/" + this.from_user + "' class='tweet-url profile-pic url'>"
                              + "<img class='photo fn' height='48' src='" + this.profile_image_url + "' width='48'></a></span>"

                    ct.append(sp1)

                    var sp2 = "<span class='status-body'><strong><a href='http://twitter.com/" + this.from_user + "' class='tweet-url screen-name'>"
                              + this.from_user + "</a></strong>"
                              + "<span class='entry-content'>" + this.text + "</span>"

                    ct.append(sp2).append("<br>")
                })
            },
        })
  }
}
