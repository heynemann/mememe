/*
 * jQuery Shout plugin
 * http://gnu.gabrielfalcao.com/shout
 *
 * Copyright (c) 2009 Gabriel Falcão
 * Dual licensed under the MIT and GPL 3+ licenses.
 *
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/copyleft/gpl.html
 *
 * Version: 0.3
 */
jQuery.extend(
    {
        _jq_shout: {},
        shout: function (event, data){
            var item = this._jq_shout.registry[event];
            if (item) {
                jQuery.each(item,
                            function (){
                                this.callback(this.source, data);
                            });
            }
        }
    });


jQuery.extend(jQuery._jq_shout,
              {
                  registry: {}
              });

jQuery.extend(jQuery.fn,
              {
                  stopHearing: function (eventName) {
                      var $self = this;
                      var list = jQuery._jq_shout.registry[eventName];
                      if (!list) {
                          jQuery._jq_shout.registry[eventName] = [];
                      }
                      var newList = [];

                      jQuery.each(
                          list,
                          function(){
                              if (this != $self) {
                                  newList.push(this);
                              }
                          }
                      );
                      jQuery._jq_shout.registry[eventName] = newList;
                  },
                  hear: function (eventName, messageCallback) {
                      var $self = this;
                      var list = jQuery._jq_shout.registry[eventName];
                      if (!list) {
                          jQuery._jq_shout.registry[eventName] = [];
                      }
                      var action = function() {
                          var item = {
                              source: $self,
                              callback: messageCallback
                          }
                          jQuery._jq_shout.registry[eventName].push(item);
                      }
                      if ($self.length > 0) {
                          return this.each(action);
                      } else {
                          throw 'The current DOM does not have any "' + $self.selector + '" matched elements';
                      }
                  }
              });

