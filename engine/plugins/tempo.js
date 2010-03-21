
jQuery.tempo = {
    add:function(container, geoData) {
        var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.bylocation%20where%20location%3D'{{city}}'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?"


        var myIpUrl = url.replace('{{city}}', geoData.query.results.Response.City.replace("ã","a"));
        
        $.ajax({
            url: myIpUrl,
            dataType: 'jsonp',
            success: function(data) {
                x = data;
                var astronomy  = data.query.results.weather.rss.channel.astronomy; //sunrise, sunset
                var atmosphere = data.query.results.weather.rss.channel.atmosphere; //humidity,pressure,rising,visibility
                var cond       = data.query.results.weather.rss.channel.item.condition; //date,temp,text
                var wind       = data.query.results.weather.rss.channel.wind;

                var dv =  '<div class="night" id="yw-forecast">'
                    + '<dl>'
                    + '<dt>Feels Like:</dt><dd>'+wind.chill+' °F</dd>'
                    + '<dt>Barometer:</dt><dd style="position: relative;">'+atmosphere.pressure+' in and ' 
                    + (atmosphere.rising=="0"?"falling":"rising")+'</dd>'
                    + '<dt>Humidity:</dt><dd>'+atmosphere.humidity+' %</dd>'
                    + '<dt>Visibility:</dt><dd>'+atmosphere.visibility+' mi</dd>'

                    + '<dt>Dewpoint:</dt><dd>'+cond.temp+' °F</dd>'
                    + '<dt>Wind:</dt><dd>'+wind.speed+' mph</dd>'
                    + '<dt>Sunrise:</dt><dd>'+astronomy.sunrise+'</dd>'
                    + '<dt>Sunset:</dt><dd>'+astronomy.sunset+'</dd>'

                    + '</dl>'
                    + '<div class="forecast-temp">'
                    + '<div class="yw-temp">'+cond.temp+'°</div>'
                    + '<p class="fore-highlow">High: 82° Low: 69°</p>'
                    + '</div>'
                    + '<div style="background: transparent url(http://l.yimg.com/a/i/us/nws/weather/gr/27n.png) repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous;" class="forecast-icon"/>'
                    + '</div>';

                $('#tempo', container).append(dv);

            }
        });
    }
}
