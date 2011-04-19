/*
 * Smartips (tooltip and help text plugin)
 */
(function($) {
   $.fn.smartips = function(options) {
      var settings = {
         modeDataAttr: 'data-smartip-mode',
         defaultMode: 'tooltip',
         delay: 800,
         helptext: {
            elementDataAttr: 'data-smartip-element'
         }
      };
      
      var modeMethods = {
         tooltip: function (element) {
            // Do nothing.
         },
         
         helptext: function (element) {
            var $this = $(element);
            var $container = $('#' + $this.attr(settings.helptext.elementDataAttr));
            
            var text = $this.attr('title');
            $this.attr('title', '');
            
            var methods = {
               onDisplay: function () {
                  $container.hide().html(text).fadeIn();
               },
               onHide: function () {
                  $container.html('');
               }
            };
            
            var timer;
            
            $this.hover(function () {
               timer = setTimeout(methods.onDisplay, settings.delay);
            }, function () {
               clearTimeout(timer);
               methods.onHide();
            });
         }
      };
      
      return this.each(function () {
         if (options) {
            $.extend(settings, options);
         }
         var $this = $(this);
         
         var mode = $this.attr(settings.modeDataAttr) || settings.defaultMode;
         
         if (modeMethods[mode]) {
            modeMethods[mode]($this);
         }
         else {
            $.error('Mode ' + mode + ' is not defined in jQuery.smartips.');
         }
      });
   };
})(jQuery);

/**
 * Unspamify: Convert "spam-concious" links to mailto: links. This plugin 
 * reads the .html() of an anchor element and adds a "href" attribute that is
 * a mailto link.
 *
 * Formats supported:
 *  - <a>display text here: email at domain dot com</a>
 *  - <a>email at domain dot com</a>
 *
 * Author: Andrew Dunkman
 */
(function($) {
   $.fn.unspamify = function() {
      return this.each(function () {
         var $this = $(this);
         
         var email;
         var display;

         var text = new String($this.html());
         var arr1 = text.split(':');
         
         if (typeof (arr1[1]) == 'undefined') {
            var arr2 = arr1[0].split(' ');
            var user = arr2[0];
            var domain = arr2[2];
            var ext = arr2[4];

            email = user + '@' + domain + '.' + ext;
            display = email;
         }
         else {
            var arr2 = arr1[1].split (' ');
            var user = arr2[1];
            var domain = arr2[3];
            var ext = arr2[5];

            email = user + '@' + domain + '.' + ext;
            display = arr1[0];
         }

         $this.attr("href", "mailto:" + email);
         $this.html(display);
      });
   };
})(jQuery);

/**
 * Popit: Pop open urls in a new window.
 *
 * Author: Andrew Dunkman
 */
(function($) {
   $.fn.popit = function() {
      return this.each(function () {
         $(this).attr({
            target: "_blank"
         });
      });
   };
})(jQuery);


/**
 * Invoke the above libraries.
 */
$(document).ready(function () {
   $("a.email-text").unspamify();
   $(".tooltip").smartips();
   $("a[href^='http://']").popit();
   $("a[href^='https://']").popit();
});