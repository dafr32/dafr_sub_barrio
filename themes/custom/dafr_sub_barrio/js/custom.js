/**
 * @file
 * Global utilities.
 *
 */
(function($, Drupal) {

  'use strict';


  Drupal.behaviors.dafr_barrio_sass = {
    attach: function(context, settings) {

      // MENU open submenu on hover
      $(document).ready(function () {
        // On hover event for the element triggering the submenu
        $('.nav-item.dropdown').hover(
          // Function to execute on hover in
          function () {
            // Show the dropdown menu
            $('.dropdown-menu').addClass('show');
          },
          // Function to execute on hover out
          function () {
            // Hide the dropdown menu
            $('.dropdown-menu').removeClass('show');
          }
        );
      });


      // searchbox - open form search on click
      $('.search-one__box svg').on('click', function (e) {
        if ($(this).parent().hasClass('show')) {
          $(this).parent().removeClass('show');
        } else {
          $(this).parent().addClass('show');
        }
        e.stopPropagation();
      });


      // aktualny rok w copyright
      Drupal.behaviors.copyright = {
        attach: function (context, settings) {
          once('copyright', '#copyright span', context).forEach(function (element) {
            var year = new Date().getFullYear();
            element.textContent = year;
          });
        }
      };
    }
  }


})(jQuery, Drupal);