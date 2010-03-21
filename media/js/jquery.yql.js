/*
 * jQuery YQL plugin
 *
 * Copyright (c) 2010 Gabriel Falcão
 * Copyright (c) 2010 Lincoln de Sousa
 * Dual licensed under GPL 3+ license.
 *
 * http://www.gnu.org/copyleft/gpl.html
 *
 * Version: 0.2
 */

(function($){
     $.extend(
         {
             _prepareYQLQuery: function (query, params) {
                     $.each(
                         params, function (key) {
                             var name = "#{" + key + "}";
                             var value = this;
                             if (isNaN(parseInt(value))) {
                                 value = '"' + value + '"';
                             }
                             query = query.replace(name, value);
                         }
                     );
                 return query;
             },
             yql: function (query) {
                 var $self = this;
                 var params = {};
                 var successCallback = null;

                 if (typeof arguments[1] == 'object') {
                     query = $self._prepareYQLQuery(query, arguments[1]);
                     successCallback = arguments[2];
                 } else if (typeof arguments[1] == 'function') {
                     successCallback = arguments[1];
                 }

                 var doAsynchronously = successCallback != null;

                 $.ajax(
                     {
                         url: "http://query.yahooapis.com/v1/public/yql",
                         dataType: "jsonp",
                         success: successCallback,
                         async: doAsynchronously,
                         data: {
                             q: query,
                             format: "json",
                             env: 'store://datatables.org/alltableswithkeys',
                             callback: "?"
                         }
                     }
                 );
                 return $self.toReturn;
             }
         }
     );
 })(jQuery);
