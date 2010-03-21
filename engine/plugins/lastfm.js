var showTemplate =
    '<li>' +
    '  <div class="imgContainer"><img /></div>' +
    '  <ul></ul>' +
    '</li>';


jQuery.lastfm = {
    add:function(container, geoData){
        var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20lastfm.geo.getevents%20where%20api_key%3D%225141317b1b9c2d30fa50ccebcd2d96a2%22%20and%20lat%3D%22{{latitude}}%22%20and%20long%3D%22{{longitude}}%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?";

        var myIpUrl = url.replace('{{latitude}}', geoData.query.results.Response.Latitude)
                         .replace('{{longitude}}', geoData.query.results.Response.Longitude);

        $.ajax({
            url: myIpUrl,
            dataType: 'jsonp',
            success: function(data) {
                events = data.query.results.lfm.events.event;
                $('.lastfm ul.eventList', container).html('');

                $.each(events, function()
                {
                    var event = this;
                    var $eventList = $('.lastfm ul.eventList', container);
                    var $htmlObj = $(showTemplate).appendTo($eventList);
                    var $ul = $('ul', $htmlObj);

                    if (event.image)
                        $('img', $htmlObj).attr('src', event.image[1].content);

                    if (event.artists && event.artists.headliner)
                        $('<li><label>Artist:</label>'+event.artists.headliner+'</li>')
                            .appendTo($ul);

                    if (event.title)
                        $('<li><label>Title:</label>'+event.title+'</li>')
                            .appendTo($ul);

                    if (event.tags) {
                        var tags = '';
                        if (event.tags.tag)
                            tags = event.tags.tag;
                        else
                            tags = event.tags.join(', ');
                        $('<li><label>Tags:</label>'+tags+'</li>')
                            .appendTo($ul);
                    }

                    if (event.venue.location.street) {
                        $('<li><label>Location:</label>'+event.venue.location.street+'</li>')
                            .appendTo($ul);
                    }

                    if (event.venue && event.venue.phonenumber)
                        $('<li><label>Phone num:</label>'+event.venue.phonenumber+'</li>')
                            .appendTo($ul);

                    if (event.url && event.venue.name)
                        $('<li><label>Url:</label><a href="'+event.url+'">' +
                          event.venue.name + '</a></li>').appendTo($ul);

                    $('div.imgContainer', $htmlObj).css('height', $ul.height());
                });
            }
        });
    }
};
