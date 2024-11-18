(function ($, Drupal, once) {
  Drupal.behaviors.owlCarousel = {
    attach: function (context, settings) {
      $(once('owl-carousel', '.owl-carousel', context)).owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items: 1,
        dots: true,
        dotsEach: true,
        animateOut: 'animate__fadeOutLeft',                          
        smartSpeed:450
      });

      
    }
  };
})(jQuery, Drupal, once);

