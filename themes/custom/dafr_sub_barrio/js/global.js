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
        });
      }
    },
  };

  Drupal.behaviors.dafr_sub_barrio = {
    attach: function (context, settings) {

    }
  };

})(jQuery,Drupal);
