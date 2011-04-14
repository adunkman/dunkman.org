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
 * Replace textified email addresses with mailto: links
 */
$(document).ready(function () {
   $("a.email-text").each(function (index, element) {
      element = $(element);

      var email;
      var display;

      var text = new String(element.html());
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

      element.attr("href", "mailto:" + email);
      element.html(display);
   });

   // Enable smartips on anything with a class of "tooltip"
   $(".tooltip").smartips();
});