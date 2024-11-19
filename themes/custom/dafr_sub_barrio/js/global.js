/**
 * @file
 * Global utilities.
 *
 */
(function (Drupal) {

  'use strict';

  Drupal.behaviors.libraries_init = {
    attach: function (context, settings) {
    	AOS.init();
      skrollr.init({
        render: function(data) {
            //Debugging - Log the current scroll position.
            //console.log(data.curTop);
        }
      });
    },
  };

  Drupal.behaviors.dafr_sub_barrio = {
    attach: function (context, settings) {

    }
  };

})(Drupal);
