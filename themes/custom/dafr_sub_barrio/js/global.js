/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.libraries_init = {
    attach: function (context, settings) {
    	AOS.init();

      if ($('.rellax', context).length) {
        new Rellax('.rellax', {
          // Example Rellax options (customize as needed)
          speed: -2, // Speed of the parallax effect
          center: true, // Center the parallax effect
          wrapper: null, // Optional wrapper element
        });
      }
    },
  };

  Drupal.behaviors.dafr_sub_barrio = {
    attach: function (context, settings) {

    }
  };

})(jQuery,Drupal);
