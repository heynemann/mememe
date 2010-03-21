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

jQuery.widgets = {

    addonsToLoad: [],

    geoIp: null,

    init: function (options)
    {
        var widgets = [];
        var pluginsToLoad = options.pluginsToLoad;

        /* We should not load available widgets that are not default
         * in the main page. User will need to add it with the `Add
         * widget' button. */
        $.each(options.availableWidgets, function ()
        {
            var widget = this;
            if (!pluginsToLoad && !widget['default'])
                return;
            if (pluginsToLoad && pluginsToLoad.join().indexOf(widget['slug']) == -1)
                return;
            widgets.push(widget);
        });

        this.geoIp = options.geoIp;

        this.bindWidgets(widgets, pluginsToLoad);
    },

    /** Iterates over a list of widgets, build their html, their js
     * and call the main plugin function that fills the widget
     * content. */
    bindWidgets: function (widgetList)
    {
        /* this is the html that a widget must have. To avoid repeating it
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
            '        <li class="remove"><a href="javascript:;">remove</a></li>' +
            '      </ul>' +
            '      <br class="clear" />' +
            '    </div>' +
            '    <div class="content"></div>' +
            '  </div>' +
            '</li>';

        /* Preserving the `this' var to use it in another context. */
        var _self = this;

        var containers = [];

        $.each(widgetList, function (item) {
            var widget = this;

            /* Time to make the widget template become a jquery object,
             * replacing the title var and then calling the load widget
             * to fill the content. */
            var widgetHtml = widgetTemplate.replace('{{ title }}', widget.name);
            var $widget = $(widgetHtml);
            $widget.appendTo($('#widgetsArea'));
            $('li.remove a', $widget).click(function(){$widget.remove();});
            _self.loadWidget($widget, widget);
            containers.push($widget);
        });

        $.each(_self.addonsToLoad, function(index){
            this(containers[index], _self.geoIp);
        });
        _self.addonsToLoad = [];
    },

    loadWidget: function (jElement, widgetObj) {
        var _self = this;

        /* Loading the html template of the plugin. */
        $.ajax({
            url: widgetObj.html_url,
            async: false,
            success: function (data) {
                var $container = $('div.content', jElement).html(data);

                /* The plugin html file was loaded success full, it is time
                 * to load its javascript file and execute the plugin
                 * function inside of it. */
                $.ajax({
                    url: widgetObj.js_url,
                    dataType: 'script',
                    async: false
                });
            },
            error: function (xmlHttpRequest, message, exception)
            {
                $('.errors').html('O widget n&atilde;o p&ocirc;de ser inserido com sucesso');
                $('.errors').show();
            }
        });
        var plugin = $[widgetObj.slug];
        _self.addonsToLoad.push(plugin.add);
    }
};

