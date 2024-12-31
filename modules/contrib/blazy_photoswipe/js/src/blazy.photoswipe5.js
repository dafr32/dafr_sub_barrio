/**
 * @file
 * Provides own PhotoSwipe loader for advanced contents with videos, etc.
 *
 * @see https://photoswipe.com/v5/docs/getting-started/
 */

(($, Drupal, drupalSettings, _win, _doc) => {
  const NAME = "photoswipe";
  const BASE_URL = drupalSettings.path.baseUrl;
  const BASE_PATH =
    drupalSettings.photoswipe.path || `${BASE_URL}libraries/${NAME}`;
  const PSWP_PATH = `${BASE_PATH}/dist/${NAME}.esm.min.js`;
  const LIGHTBOX_PATH = `${BASE_PATH}/dist/${NAME}-lightbox.esm.min.js`;
  const MOUNTED = `${NAME}--on`;
  const GALLERY = `[data-${NAME}-gallery]`;
  const TRIGGER = `[data-${NAME}-trigger]`;
  const BLAZY = Drupal.blazy || {};
  const ID_ONCE = `blazy-${NAME}`;
  const ELEMENT = `${GALLERY}:not(.${MOUNTED})`;
  const SANITIZER = $.sanitizer;
  let _videoClickTimer = 0;

  /**
   * Blazy PhotoSwipe public methods.
   *
   * @namespace
   */
  Drupal.blazyPhotoSwipe = $.extend(Drupal.blazyPhotoSwipe || {}, {
    init: import( /* webpackIgnore: true */ LIGHTBOX_PATH),
    pswp: import( /* webpackIgnore: true */ PSWP_PATH),
  });

  /**
   * Blazy PhotoSwipe utility functions.
   *
   * @param {Element} gallery
   *   The gallery HTML element.
   */
  function process(gallery) {
    const opts = drupalSettings.photoswipe.options || {};
    // const dataSource = [];
    const links = $.findAll(gallery, `a${TRIGGER}`);
    let pswpElm = $.find(_doc.body, "> .pswp");

    /**
     * Gets the current clicked item index.
     *
     * @param {Element} item
     *   The link item HTML element.
     *
     * @return {Int}
     *   The current clicked item index.
     */
    function getIndex(item) {
      let i = 0;

      for (; i < links.length; i++) {
        const link = links[i];

        if (link === item) {
          return i;
        }
      }
      return i;
    }

    /**
     * Triggers when user clicks on buttons, or after changing slides.
     */
    function closeVideo() {
      if (!$.isElm(pswpElm)) {
        return;
      }

      const playing = $.find(pswpElm, ".is-playing");
      if ($.isElm(playing)) {
        const btn = $.find(pswpElm, ".is-playing .media__icon--close");

        if ($.isElm(btn)) {
          $.trigger(btn, "click");
        }
      }

      const vid = $.find(pswpElm, "video");
      if ($.isElm(vid)) {
        vid.pause();
      }
    }

    /**
     * Extracts img[src|srcset].
     *
     * @param {String} html
     *   The tml string.
     * @param {String} attr
     *   The image attributes.
     *
     * @return {String}
     *   The img[src|srcset].
     */
    function extract(html, attr) {
      return html.split(`${attr}="`).pop().split('"')[0];
    }

    /**
     * Returns the item data based on the given trigger/ link.
     *
     * @param {Element} elm
     *   The link element.
     *
     * @return {Object}
     *   The item data object.
     */
    function getItemData(elm) {
      const item = {};
      const caption = elm.nextElementSibling;
      const dataset = $.parse($.attr(elm, "data-b-media data-media"));
      const div = $.find(elm, ".media");
      const href = $.attr(elm, 'href');
      const url = $.attr(elm, 'data-box-url', href, true);
      const img = $.find(elm, "img");
      const tnUrl = $.isElm(div) ? $.attr(div, "data-b-thumb data-thumb") : "";
      const alt = $.attr(img, "alt", Drupal.t("Preview"), true);
      const index = getIndex(elm);
      const owidth = dataset.owidth || null;
      const oheight = dataset.oheight || null;
      const rwidth = dataset.width || null;
      const rheight = dataset.height || null;
      const ewidth = owidth && owidth > rwidth ? owidth : rwidth;
      const eheight = oheight && oheight > rheight ? oheight : rheight;
      const width = $.toInt(owidth && ewidth < 327 ? 320 : ewidth, 640);
      const height = $.toInt(oheight && eheight < 327 ? 520 : eheight, 360);
      let html = "";

      item.element = elm;
      // @todo recheck inconsistent old vs new: h vs. height, w vs. width.
      // https://photoswipe.com/data-sources/#from-an-array-or-nodelist
      item.width = width;
      item.height = height;
      item.index = index;
      item.mediaType = dataset.boxType;
      item.irrational = dataset.irrational;
      item.alt = Drupal.checkPlain(alt);

      if (caption && $.hasClass(caption, 'litebox__caption')) {
        item.caption = caption.innerHTML;
      }

      if (tnUrl) {
        item.msrc = tnUrl;
      }

      if ("html" in dataset) {
        html = dataset.html;

        if (dataset.encoded) {
          html = atob(html);
        }

        html = SANITIZER.sanitize(html);

        // Only supports non-picture, unfortunately.
        const isResimage = html.indexOf("srcset") > 0;
        if (isResimage) {
          item.type = "image";
          item.srcset = extract(html, "srcset");
          item.src = extract(html, "src");
        }
        else {
          item.type = "html";
          item.html = Drupal.theme("blazyPhotoSwipe", {
            html: html,
            data: item,
          });
        }
      }
      else if (dataset.boxType === "iframe") {
        item.html = Drupal.theme("blazyMedia", {
          el: elm,
        });
        item.type = "html";
      }
      else {
        item.src = url;
        item.type = "image";
      }

      return item;
    }

    // dataSource works as per 5.3.9 - 5.4.1, but corrupts custom-defined keys
    // causes failing video, html, etc. Hence why using event.itemData below.
    // $.each(links, (link) => {
    // dataSource.push(getItemData(link));
    // });
    // Build PhotoSwipe gallery.
    // Prevent HTML or Video cover from triggering close.
    opts.clickToCloseNonZoomable = false;

    // Pass data to PhotoSwipe and initialize it.
    opts.gallery = GALLERY;
    opts.children = TRIGGER;
    opts.thumbSelector = TRIGGER;

    const resimage = $.find(gallery, "[data-srcset]");
    opts.preloadFirstSlide = !$.isElm(resimage);
    opts.pswpModule = () => import(PSWP_PATH);

    const lightbox = new PhotoSwipeLightbox(opts);

    // Listen to events.
    lightbox.on("beforeOpen", () => {
      // Assigns the pswp object for downstream references.
      Drupal.blazyPhotoSwipe.lightbox.pswp = gallery.pswp.pswp = lightbox.pswp;
    });

    // dataSource works as per 5.3.9 - 5.4.1, but corrupts custom-defined keys
    // causes failing video, html, etc. Hence why using event.itemData.
    // opts.dataSource = dataSource;
    lightbox.on("itemData", (e) => {
      const {
        element
      } = e.itemData;
      if (element) {
        e.itemData = getItemData(element);
      }
    });

    lightbox.on("uiRegister", () => {
      const uiOpts = Drupal.blazyPhotoSwipe.ui || {};

      uiOpts.customCaption = {
        name: "custom-caption",
        order: 9,
        isButton: false,
        appendTo: "root",
        html: "",
        onInit: (el) => {
          lightbox.pswp.on("change", () => {
            const {
              data
            } = lightbox.pswp.currSlide;

            const _captioned = "caption" in data;

            el.innerHTML = _captioned ? SANITIZER.sanitize(data.caption) : "";
            $[_captioned ? "addClass" : "removeClass"](el, "is-not-empty");
          });
        },
      };

      $.each(uiOpts, (ui) => {
        lightbox.pswp.ui.registerElement(ui);
      });
    });

    lightbox.on("slideDeactivate", () => {
      // Stop any playing video after change.
      closeVideo();
    });

    lightbox.on("afterSetContent", () => {
      const _blazy = BLAZY.init;
      pswpElm = lightbox.pswp.template;

      Drupal.attachBehaviors(pswpElm);
      const elms = $.findAll(pswpElm, ".b-lazy:not(.b-loaded)");

      if (elms.length && _blazy) {
        _blazy.load(elms);
      }
    });

    lightbox.on("slideActivate", (item) => {
      const {
        slide
      } = item;

      const {
        data
      } = slide;

      clearTimeout(_videoClickTimer);
      _videoClickTimer = setTimeout(() => {
        const media = $.find(slide.container, ".media");

        if ($.isElm(media)) {
          Drupal.attachBehaviors(media);
        }

        closeVideo();

        // Automatically play video on focus.
        if (data) {
          const isHtml = data.html;
          const isLocalVideo = $.isElm(media) && data.mediaType === "video";
          const isRemoteVideo = data.mediaType === "iframe";
          const addClass = isHtml || isLocalVideo || isRemoteVideo;

          // Videos/ html are not swipeable at mobile devices, add helper class.
          $[addClass ? "addClass" : "removeClass"](pswpElm, "pswp--is-html");

          if (isRemoteVideo) {
            const btn = $.find(slide.container, ".media__icon--play");

            if ($.isElm(btn)) {
              btn.click();
            }
          }
        }
        // @fixme unreliable, cannot be faster than this due to slow build time.
      }, 1000);
    });

    lightbox.on("pointerDown", () => {
      $.addClass(pswpElm, "pswp--dragging");
    });

    lightbox.on("pointerUp", () => {
      if (pswpElm.className.match("pswp--dragging")) {
        pswpElm.className = pswpElm.className.replace(
          /(\S+)pswp--dragging/,
          ""
        );
      }
    });

    lightbox.on("close", () => {
      // Stop any playing video after close.
      closeVideo();
    });

    // @todo remove, deprecated for gallery.pswp + .lightbox.
    Drupal.blazyPhotoSwipe.beforeInit = lightbox;

    lightbox.init();

    // Exposes lightbox object per element and globally.
    // The global reference is only to store the immutable pswp object.
    Drupal.blazyPhotoSwipe.lightbox = lightbox;
    gallery.pswp = lightbox;

    // @todo remove, deprecated for gallery.pswp + .lightbox.
    Drupal.blazyPhotoSwipe.afterInit = lightbox;

    $.addClass(gallery, MOUNTED);
  }

  /**
   * Theme function for a blazy PhotoSwipe (Remote|local) video.
   *
   * @param {Object} settings
   *   An object with the following keys: data and html.
   *
   * @return {String}
   *   Returns a HTML string.
   */
  Drupal.theme.blazyPhotoSwipe = (settings) => {
    const {
      data
    } = settings;

    const irrational = data.irrational ? ' media-wrapper--noratio' : '';
    return `<div class="pswp__item--html media-wrapper media-wrapper--box${irrational}" style="width: ${data.width}px">${settings.html}</div>`;
  };

  /**
   * Attaches PhotoSwipe behavior to HTML element [data-photoswipe-gallery].
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.blazyPhotoSwipe = {
    attach: (context) => {

      // Ensures only executed once.
      const items = $.findAll(context, ELEMENT);

      if (items.length) {
        // Registers the PhotoSwipeLightbox namespace if/ since nobody does.
        Drupal.blazyPhotoSwipe.init.then(({
          default: PhotoSwipeLightbox
        }) => {
          _win.PhotoSwipeLightbox =
            _win.PhotoSwipeLightbox || PhotoSwipeLightbox;
          $.once(process, ID_ONCE, items, context);
        });
      }
    },
  };
})(dBlazy, Drupal, drupalSettings, this, this.document);
