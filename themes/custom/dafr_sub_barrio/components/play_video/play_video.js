(function (Drupal, $) {

  Drupal.behaviors.playVideo = {
    attach: function (context) {
      
      jQuery('.popup-video', context).magnificPopup({
        type: 'iframe',
        fixedContentPos: false,
        midClick: true, // umożliwia otwieranie popupu przez kliknięcie w link
        callbacks: {
          open: function () {
            setTimeout(function () {
              $('.mfp-iframe-holder .mfp-content').addClass('mfp-ready');
            }, 5);                        
          },
          close: function () {
            // Usuń klasę po zamknięciu popupu
            $('.mfp-iframe-holder .mfp-content').removeClass('mfp-ready');
          }
        }
      });
  
      if (!jQuery.browser.mobile) {
        jQuery(".youtube-bg", context).mb_YTPlayer();
      }


      $('.open-popup-link').magnificPopup({
        type: 'inline', // lub inny typ popupu
        midClick: true, // umożliwia otwieranie popupu przez kliknięcie w link
        callbacks: {
          open: function () {
            // Dodaj klasę, aby uruchomić animację powiększania
            $('.mfp-iframe-holder').addClass('mfp-ready');
          },
          close: function () {
            // Usuń klasę po zamknięciu popupu
            $('.mfp-iframe-holder').removeClass('mfp-ready');
          }
        }
      });

    }
  };
})(Drupal, jQuery);
