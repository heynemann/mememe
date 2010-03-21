/*
 * addwidget.js - this file is part of the 'mememe' project
 *
 * Copyright (C) 2010  Lincoln de Sousa <lincoln@comum.org>
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

$(function () {
    var $widgetListContainer = $('#widgetsToAdd');

    $('body').click(function ()
    {
        $widgetListContainer.fadeOut();
    });

    $('#addWidgetLink').click(function (event)
    {
        $widgetListContainer.html('');
        var $ul = $('<ul>').appendTo($widgetListContainer);
        $.each(allWidgets, function ()
        {
            var widget = this;
            var $link = $('<a>')
                .html(widget.name);

            $('<li>')
                .append($link)
                .appendTo($ul);

            $link.click(function ()
            {
                $widgetListContainer.hide();
                for (var i in allWidgets)
                    if (widget.name == allWidgets[i].name) {
                        $.widgets.bindWidgets([widget]);
                    }
            });
        });

        var offset = $(this).offset();
        $widgetListContainer.css('top', offset.top + 'px');
        $widgetListContainer.css('left', offset.left + 'px');
        $widgetListContainer.fadeIn();
        return false;
    });
});
