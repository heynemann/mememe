(function($) {
  $.fn.enterpress = function(fun) {
    this.keydown(function(ev) {      
      if (ev.which == 13) //enter
        fun.call(this)
    })
    return this
  }
})(jQuery)
