jQuery.restaurante = {
    add: function(container, geoData) {
        $(this).maps_search($(".restaurante", container), 
                            "restaurante", 
                            geoData.query.results.Response.Latitude, 
                            geoData.query.results.Response.Longitude);
    }
}

