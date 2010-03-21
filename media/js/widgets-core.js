/*
 * widgets-core.js - this file is part of the 'mememe' project
 *
 * Copyright (C) 2010  Bernardo Heynemann <bernardo@corp.globo.com>
 * Copyright (C) 2010  Gabriel Falcão <gabriel@nacaolivre.org>
 * Copyright (C) 2010  Lincoln de Sousa <lincoln@comum.org>
 * Copyright (C) 2010  Thiago Silva <tsilva@sourcecraft.info>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var geoIp = {
    "query":{
        "count":"1",
        "created":"2010-03-20T05:33:16Z",
        "lang":"en-US",
        "updated":"2010-03-20T05:33:16Z",
        "uri":"http://query.yahooapis.com/v1/yql?q=select+*+from+ip.location+where+ip%3D%27200.159.32.100%27",
        "results":{
            "Response":{
                "Ip":"200.159.32.100",
                "Status":"OK",
                "CountryCode":"BR",
                "CountryName":"Brazil",
                "RegionCode":"27",
                "RegionName":"Sao Paulo",
                "City":"São Paulo",
                "ZipPostalCode":null,
                "Latitude":"-23.5333",
                "Longitude":"-46.6167",
                "Timezone":"-3",
                "Gmtoffset":"-2",
                "Dstoffset":"-3"
            }
        }
    }
};

//Para obter mais informacões geográficas
//http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20google.geocoding%20where%20q%3D%22-23.5333%2C-46.6167%22&format=json&diagnostics=false&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=cbfunc

jQuery.widgets = {

    init: function (options)
    {
        this.bindAvailableWidgets(options.availableWidgets);
    },

    /** Iterates over all available widgets found, build their html,
     * their js and call the main plugin function that fills the widget
     * content. */
    bindAvailableWidgets: function (availableWidgets)
    {
        /* This is the html that a widget must have. To avoid repeating it
         * or writting a lots of jquery expressions, we're putting it here.
         * The {{ title }} `var' will be replaced in this function, the
         * content div will be filled by the loadWidget() method
         * assyncronously. */
        var widgetTemplate =
            '<li>' +
            '  <div class="widget">' +
            '    <div class="header">' +
            '      <strong>{{ title }}</strong>' +
            '      <ul class="controls">' +
            '        <li class="stick"><a href="javascript:;">stick</a></li>' +
            '        <li class="close"><a href="javascript:;">close</a></li>' +
            '      </ul>' +
            '      <br class="clear" />' +
            '    </div>' +
            '    <div class="content"></div>' +
            '  </div>' +
            '</li>';

        /* Preserving the `this' var to use it in another context. */
        var _self = this;

        $.each(availableWidgets, function (item)
               {
                   var widget = this;

                   /* Time to make the widget template become a jquery object,
                    * replacing the title var and then calling the load widget
                    * to fill the content. */
                   var widgetHtml = widgetTemplate.replace('{{ title }}', widget.name);
                   var $widget = $(widgetHtml);
                   $widget.appendTo($('#widgetsArea'));
                   _self.loadWidget($widget, widget);
               });
    },

    loadWidget: function (jElement, widgetObj) {
        var _self = this;

        /* Loading the html template of the plugin. */
        $.ajax({
            url: widgetObj.html_url,
            success: function (data) {
                var $container = $('div.content', jElement).html(data);

                console.log("loading js ", widgetObj.js_url)

                /* The plugin html file was loaded success full, it is time
                 * to load its javascript file and execute the plugin
                 * function inside of it. */
                $.ajax({
                    url: widgetObj.js_url,
                    dataType: 'script',
                    success: function (data) {
                        console.log("loaded js ", widgetObj.js_url, "(" + widgetObj.slug + ") ", jQuery[widgetObj.slug])
                        var plugin = $[widgetObj.slug];
                        //plugin.add($container, geoIp);
                    }
                });
            },

            error: function (xmlHttpRequest, message, exception)
            {
                $('.errors').html('O widget n&atilde;o p&ocirc;de ser inserido com sucesso');
                $('.errors').show();
            }
        });

    }
};

