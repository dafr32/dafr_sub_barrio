/**
 * @file
 * Provides own PhotoSwipe loader for advanced contents with videos, etc.
 *
 * @see https://photoswipe.com/documentation/api.html
 */

/* eslint-disable */
(function ($, Drupal, drupalSettings, PhotoSwipe, PhotoSwipeUI_Default, _win, _doc) {

  'use strict';

  var _name = 'photoswipe';
  var _nick = 'pswp';
  var _idOnce = 'b-' + _nick;
  var _dataName = 'data-' + _name;
  var _mounted = 'is-' + _nick + '-on';
  var _element = '[' + _dataName + '-gallery]:not(.' + _mounted + ')';
  var _trigger = '[' + _dataName + '-trigger]';
  var _dataUid = 'data-' + _nick + '-uid';
  var _blazy = Drupal.blazy || {};
  var _sanitizer = $.sanitizer;
  var _videoClickTimer;

  /**
   * Blazy PhotoSwipe utility functions.
   *
   * @param {HTMLElement} gallery
   *   The gallery HTML element.
   * @param {Int} uid
   *   The index of the current element.
   */
  function process(gallery, uid) {
    var opts = drupalSettings.photoswipe.options || {};
    var pswpElm = $.find(_doc.body, '> .' + _nick);
    var triggers = $.findAll(gallery, _trigger);
    var items = [];

    /**
     * Build the gallery items.
     *
     * @param {HTMLElement} elm
     *   The link HTML element.
     * @param {Int} i
     *   The index of the current element.
     */
    function buildItems(elm, i) {
      var caption = elm.nextElementSibling;
      var dataset = $.parse($.attr(elm, 'data-b-media data-media'));
      var div = $.find(elm, '.media');
      var href = $.attr(elm, 'href');
      var url = $.attr(elm, 'data-box-url', href, true);
      var tnUrl = $.isElm(div) ? $.attr(div, 'data-b-thumb data-thumb') : '';
      var item = {};
      var html = '';

      // Save link to element for getThumbBoundsFn.
      item.el = elm;
      item.w = parseInt(dataset.width, 0);
      item.h = parseInt(dataset.height, 0);
      item.i = i;
      item.type = dataset.boxType;

      if ($.isElm(caption) && $.hasClass(caption, 'litebox__caption')) {
        item.title = _sanitizer.sanitize(caption.innerHTML);
      }

      if (tnUrl) {
        item.msrc = tnUrl;
      }

      if ('html' in dataset) {
        html = dataset.html;

        if (dataset.encoded) {
          html = atob(html);
        }

        html = _sanitizer.sanitize(html);
        item.html = Drupal.theme('blazyPhotoSwipeHtml', {
          html: html,
          data: item
        });
      }
      else if (item.type === 'iframe') {
        item.html = Drupal.theme('blazyMedia', {
          el: elm
        });
      }
      else {
        item.src = url;
      }

      items.push(item);
    }

    /**
     * Gets the current clicked item index.
     *
     * @param {HTMLElement} item
     *   The link item HTML element.
     *
     * @return {Int}
     *   The current clicked item index.
     */
    function getIndex(item) {
      var i = 0;
      $.each(triggers, function (el, idx) {
        if (el === item) {
          i = idx;
          return false;
        }
      });
      return i;
    }

    /**
     * Triggers when user clicks on thumbnail.
     *
     * @param {Event} e
     *   The event triggered by a `click` event.
     */
    function openBox(e) {
      e.preventDefault();

      // With a mix of (non-)lightboxed contents: image, video, Facebook,
      // Instagram, etc., some may not always be lightboxed, so filter em out.
      var t = e.target;
      var link = $.attr(t, 'href') ? t : $.closest(t, _trigger);
      if (!$.isElm(link)) {
        link = $.find(t, _trigger);
      }

      if ($.isElm(link)) {
        var index = getIndex(link);

        box(index);
      }
    }

    /**
     * Open the PhotoSwipe box.
     *
     * Code taken from https://photoswipe.com/documentation/getting-started.html
     *
     * @param {int} delta
     *   The start index of the slide, not the current slide index.
     */
    function box(delta) {
      delta = delta > 0 ? delta : 0;

      // Define options.
      opts.index = delta;

      // Prevent HTML or Video cover from triggering close.
      opts.clickToCloseNonZoomable = false;

      // Define gallery index (for URL).
      opts.galleryUID = $.attr(gallery, _dataUid);

      opts.getThumbBoundsFn = function (i) {
        // Gets window scroll Y.
        var pageYScroll = _win.pageYOffset || _doc.documentElement.scrollTop;

        // Gets position of element relative to viewport.
        var rect = $.rect(items[i].el);

        return {
          x: rect.left,
          y: rect.top + pageYScroll,
          w: rect.width
        };
      };

      // Pass data to PhotoSwipe and initialize it.
      var pswp = new PhotoSwipe(pswpElm, PhotoSwipeUI_Default, items, opts);

      // Listen to events.
      pswp.listen('beforeChange', function () {
        // PhotoSwipe items are always destroyed and recycled for 3, reattach.
        Drupal.attachBehaviors(pswpElm);

        var blazies = $.findAll(pswpElm, '.b-lazy:not(.b-loaded)');
        if (blazies.length && _blazy && _blazy.init) {
          _blazy.init.load(blazies);
        }
      });

      pswp.listen('afterChange', function () {
        var item = pswp.currItem;

        _win.clearTimeout(_videoClickTimer);
        _videoClickTimer = _win.setTimeout(function () {
          var media = $.find(item.container, '.media');

          if ($.isElm(media)) {
            Drupal.attachBehaviors(media);
          }

          // Stop any playing video after change.
          closeVideo();

          var isHtml = item.html;
          var isLocalVideo = $.isElm(media) && (item.type === 'video');
          var isRemoteVideo = item.type === 'iframe';
          var addClass = isHtml || isLocalVideo || isRemoteVideo;

          // Videos/ html are not swipeable at mobile devices, add helper class.
          if (pswpElm) {
            pswpElm.classList[addClass ? 'add' : 'remove'](_nick + '--is-html');
          }

          // Automatically play video on focus.
          if (isRemoteVideo && item.container) {
            var btn = $.find(item.container, '.media__icon--play');

            if ($.isElm(btn)) {
              btn.click();
            }
          }
          // @fixme unreliable, cannot be faster than this due to slow build time.
        }, 1000);
      });

      pswp.listen('pointerDown', function () {
        $.addClass(pswpElm, _nick + '--dragging');
      });

      pswp.listen('pointerUp', function () {
        if (pswpElm.className.match(_nick + '--dragging')) {
          pswpElm.className = pswpElm.className.replace(/(\S+)pswp--dragging/, '');
        }
      });

      pswp.listen('close', function () {
        // Stop any playing video after close.
        closeVideo();
      });

      pswp.init();
    }

    /**
     * Parse picture index and gallery index from URL (#&pid=1&gid=2)
     *
     * Code taken from https://photoswipe.com/documentation/getting-started.html
     * and adjusted accordingly.
     *
     * @return {Array}
     *   Return array of URL params if available, else empty array.
     */
    function parseHash() {
      var hash = _win.location.hash.substring(1);
      var params = {};

      if (hash.length < 5) {
        return params;
      }

      var vars = hash.split('&');
      for (var i = 0; i < vars.length; i++) {
        if (!vars[i]) {
          continue;
        }
        var pair = vars[i].split('=');
        if (pair.length < 2) {
          continue;
        }
        params[pair[0]] = pair[1];
      }

      if (!$.hasProp(params, 'pid')) {
        return params;
      }
      params.pid = parseInt(params.pid, 0);

      return params;
    }

    /**
     * Triggers when user clicks on buttons, or after changing slides.
     */
    function closeVideo() {
      var btn;
      var vid;
      var playing = $.find(pswpElm, '.is-playing');

      if ($.isElm(playing)) {
        btn = $.find(pswpElm, '.is-playing .media__icon--close');

        if ($.isElm(btn)) {
          $.trigger(btn, 'click');
        }
      }

      vid = $.find(pswpElm, 'video');
      if ($.isElm(vid)) {
        vid.pause();
      }
    }

    // Build items.
    $.each(triggers, buildItems, gallery);

    // Build PhotoSwipe gallery.
    $.attr(gallery, _dataUid, (uid + 1));
    // @todo recheck $.on(pswpElm, 'click', '.pswp__button', closeVideo);
    $.on(gallery, 'click', _trigger, openBox);

    // Parse URL, and auto-open gallery if it contains #&pid=3&gid=1 params.
    var hashData = parseHash();
    if (hashData.pid > 0 && !pswpElm.className.match(_nick + '--open')) {
      box(hashData.pid - 1);
    }

    $.addClass(gallery, _mounted);
  }

  /**
   * Theme function for a blazy PhotoSwipe (Remote|local) video.
   *
   * @param {Object} settings
   *   An object with the following keys: data, html.
   *
   * @return {string}
   *   Returns a html string.
   */
  Drupal.theme.blazyPhotoSwipeHtml = function (settings) {
    var data = settings.data;
    var html;

    html = '<div class="pswp__item--html media-wrapper media-wrapper--box" style="width:' + data.w + 'px">';
    html += settings.html;
    html += '</div>';

    return html;
  };

  /**
   * Theme function for a blazy PhotoSwipe container.
   *
   * Only called if photoswipe module is not installed, optional since BP:1.5.
   *
   * @return {string}
   *   Returns a html string.
   */
  Drupal.theme.blazyPhotoSwipe = function (settings) {
    var html;
    var divStart = '<div class="pswp';
    var btnStart = '<button class="pswp__button pswp__button';
    var divEnd = '</div>';
    var btnEnd = '</button>';

    html = '$divStart" tabindex="-1" role="dialog" aria-hidden="true">';
    html += '$divStart__bg">$divEnd';
    html += '$divStart__scroll-wrap">';
    html += '$divStart__container">';
    html += '$divStart__item">$divEnd';
    html += '$divStart__item">$divEnd';
    html += '$divStart__item">$divEnd';
    html += '$divEnd';
    html += '$divStart__ui $id__ui--hidden">';
    html += '$divStart__top-bar">';
    html += '$divStart__counter">$divEnd';
    html += '$btnStart--close" title="' + Drupal.t('Close (Esc)') + '">$btnEnd';
    html += '$btnStart--share" title="' + Drupal.t('Share') + '">$btnEnd';
    html += '$btnStart--fs" title="' + Drupal.t('Toggle fullscreen') + '">$btnEnd';
    html += '$btnStart--zoom" title="' + Drupal.t('Zoom in/out') + '">$btnEnd';
    html += '$divStart__preloader">';
    html += '$divStart__preloader__icn">';
    html += '$divStart__preloader__cut">';
    html += '$divStart__preloader__donut">$divEnd';
    html += '$divEnd';
    html += '$divEnd';
    html += '$divEnd';
    html += '$divEnd';
    html += '$divStart__share-modal $id__share-modal--hidden $id__single-tap">';
    html += '$divStart__share-tooltip">$divEnd';
    html += '$divEnd';
    html += '$btnStart--arrow--left" title="' + Drupal.t('Previous (arrow left)') + '">$btnEnd';
    html += '$btnStart--arrow--right" title="' + Drupal.t('Next (arrow right)') + '">$btnEnd';
    html += '$divStart__caption">';
    html += '$divStart__caption__center">$divEnd';
    html += '$divEnd';
    html += '$divEnd';
    html += '$divEnd';
    html += '$divEnd';

    return $.template(html, {
      id: _nick,
      divStart: divStart,
      btnStart: btnStart,
      divEnd: divEnd,
      btnEnd: btnEnd
    });
  };

  /**
   * Attaches PhotoSwipe behavior to HTML element [data-photoswipe-gallery].
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.blazyPhotoSwipe = {
    attach: function (context) {
      var body = _doc.body;
      var pswpElm = $.find(body, '> .pswp');

      // If body has no container for PhotoSwipe gallery, append it.
      if (!$.isElm(pswpElm)) {
        if ($.hasProp(drupalSettings.photoswipe, 'container')) {
          $.append(body, drupalSettings.photoswipe.container);
        }
        else {
          $.append(body, Drupal.theme('blazyPhotoSwipe'));
        }
      }

      $.once(process, _idOnce, _element, context);
    },
    detach: function (context, settings, trigger) {
      if (trigger === 'unload') {
        $.once.removeSafely(_idOnce, _element, context);
      }
    }
  };

}(dBlazy, Drupal, drupalSettings, PhotoSwipe, PhotoSwipeUI_Default, this, this.document));
/* eslint-enable */
