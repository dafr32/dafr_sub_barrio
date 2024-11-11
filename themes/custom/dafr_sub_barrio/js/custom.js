/**
 * @file
 * Global utilities.
 *
 */
(function($, Drupal) {

  'use strict';


  Drupal.behaviors.aos_init = {
    attach: function (context, settings) {
    	AOS.init();
    },
  };

  Drupal.behaviors.dafr_barrio_sass = {
    attach: function(context, settings) {

      // Custom code here

    }
  };


})(jQuery, Drupal);