jQuery.policia = {
    add: function(container, geoData) {
        $(this).maps_search($(".policia", container), 
                            "policia", 
                            geoData.query.results.Response.Latitude, 
                            geoData.query.results.Response.Longitude,
                            15);
    }
}

