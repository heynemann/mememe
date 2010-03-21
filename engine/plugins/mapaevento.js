
jQuery.mapaevento = {
    add: function(container, geoData, params) {
        $(this).maps_search($(".mapaevento", container), 
                            params, 
                            geoData.query.results.Response.Latitude, 
                            geoData.query.results.Response.Longitude,
                            15,false,true);
    }
}
