(function ($, Drupal) {
    Drupal.behaviors.filterizrInit = {
        attach: function (context, settings) {
            // Inicjalizacja Filterizr.
            $('.filtr-container', context).each(function () {
                // Sprawdzamy, czy element już ma przypisany Filterizr, np. przez dodanie klasy.
                if (!$(this).hasClass('filterizr-initialized')) {
                    new Filterizr(this, {
                        animationDuration: 0.5,
                        layout: 'sameWidth',   
                        delay: 50, delayMode: 'progressive'                     
                    });

                    // Dodajemy klasę, aby zapobiec ponownemu uruchomieniu.
                    $(this).addClass('filterizr-initialized');
                }
            });
        },
    };
})(jQuery, Drupal);
