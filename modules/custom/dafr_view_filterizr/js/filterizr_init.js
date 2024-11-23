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
    

    Drupal.behaviors.preventScrollToTop = {
        attach: function (context, settings) {            
            $('#filterizr .btn-filterizr').on('click', function () {
                var scrollPosition = $(window).scrollTop(); // Zapamiętaj bieżącą pozycję scrolla
                $('html, body').animate({
                    scrollTop: scrollPosition
                }, 100); 

                // Po zakończeniu animacji pozwól na dalsze przewijanie
                var scrollPosition = $(window).scrollTop();
                setTimeout(function () {
                    $(window).on('scroll', function () {
                        // Możesz dodać jakieś dalsze logikę tutaj, jeśli chcesz ograniczyć scrollowanie
                    });
                }, 100); 
            });
        }
    };

})(jQuery, Drupal);
