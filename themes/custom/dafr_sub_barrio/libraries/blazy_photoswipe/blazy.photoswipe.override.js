(function (Drupal, once) {
    Drupal.behaviors.blazyPhotoSwipe = {
      attach: function (context) {
        once('blazy-photoswipe', '.blazy-gallery', context).forEach(function (galleryElement) {
          const galleryItems = Array.from(galleryElement.querySelectorAll('a')).map(link => ({
            src: link.getAttribute('href'),
            w: parseInt(link.dataset.width),
            h: parseInt(link.dataset.height),
          }));
  
          galleryElement.addEventListener('click', function (e) {
            e.preventDefault();
            const clickedLink = e.target.closest('a');
            const index = Array.from(galleryElement.querySelectorAll('a')).indexOf(clickedLink);
  
            const lightbox = new PhotoSwipe({
              dataSource: galleryItems,
              index: index,
              bgOpacity: 0.8,
              showHideAnimationType: 'fade',
            });
  
            lightbox.init();
          });
        });
      }
    };
  })(Drupal, once);
  