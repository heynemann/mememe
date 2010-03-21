
jQuery.satelite = {
    add: function(container, geoData) {
        $(this).maps_search($(".satelite", container), 
                            "", 
                            geoData.query.results.Response.Latitude, 
                            geoData.query.results.Response.Longitude,
                            19, true);
    }
}

