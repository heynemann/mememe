
jQuery.hospitais = {
    add: function(container, geoData) {
        $(this).maps_search($(".hospitais", container), 
                            "hospitais", 
                            geoData.query.results.Response.Latitude, 
                            geoData.query.results.Response.Longitude);
    }
}

