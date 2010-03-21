jQuery.twitter = {
    add: function (container, geoData)
    {
        var url = "http://search.twitter.com/search.json?geocode="
            + geoData.query.results.Response.Latitude + ","
            + geoData.query.results.Response.Longitude + ",10km";

        var ct = $(".content", container);

        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(data) {
                var tweets = data.results;

                $.each(tweets, function (idx)
                {
                    var $li = $('<li>')
                        .appendTo($('ul', ct));

                    if (idx % 2 == 0)
                        $li.addClass('even');
                    else
                        $li.addClass('odd');

                    /* Image link */
                    var $link = $('<a>')
                        .addClass('twitImage')
                        .attr('href', 'http://twitter.com/' + this.from_user)
                        .appendTo($li);
                    var $img = $('<img/>')
                        .addClass('photo')
                        .addClass('fn')
                        .attr('height', '48')
                        .attr('width', '48')
                        .attr('src', this.profile_image_url)
                        .appendTo($link);

                    /* User link */
                    $('<a>')
                        .addClass('twitUser')
                        .attr('href', 'http://twitter.com/' + this.from_user)
                        .html(this.from_user)
                        .appendTo($li);

                    /* Text paragraph */
                    $('<p>')
                        .addClass('tuwtText')
                        .html(this.text)
                        .appendTo($li);
                });
            }
        });
    }
};
