

# <a name="top"> </a>CONTENTS OF THIS FILE

 * [Introduction](#introduction)
 * [Warning](#warning)
 * [Requirements](#requirements)
 * [Versions](#versions)
 * [Recommended modules](#recommended-modules)
 * [Features](#features)
 * [Installation](#installation)
 * [Configuration](#configuration)
 * [Maintainers](#maintainers)


***
***
# <a name="introduction"></a>INTRODUCTION
Provides a simple Blazy PhotoSwipe integration.

Be sure to read the project for more updated info.

***
## <a name="first"> </a>FIRST THINGS FIRST!
Read more at:
* [Github](https://git.drupalcode.org/project/blazy/-/blob/3.0.x/docs/README.md#first-things-first)
* [Blazy UI](/admin/help/blazy_ui#first)

***
***
# <a name="warning"> </a>WARNING
* `BP:2.x` is for D9.3+.
* `BP:8.x-1.4` is the last version which is compat between Blazy 1.x and 2.x.
* `BP:8.x-1.5` will only work with `Blazy:2.18+`. If you are still stuck in
   Blazy:1.x, consider locking it to `BP:8.x-1.4`. Or upgrade to `Blazy:2.18+`.

***
***
# <a name="requirements"> </a>REQUIREMENTS
1. [Blazy](https://drupal.org/project/blazy)
2. [PhotoSwipe](https://drupal.org/project/photoswipe)

Since `BP:1.5`, photoswipe module is optional to avoid issues with PSWP 5. Both
library versions will just work with/ without it.


# <a name="versions"> </a>VERSIONS  
Specific for PhotoSwipe 5:  

+ Blazy (3.x).
+ BP 1.6 and BP 2.x supports only v5.4.1.
+ BP 1.4+ supports only v5.3.7 (broken at some point due to breaking changes).
+ BP 1.3 supports only v5.1.7.

`Only` means the only tested versions. Normally broken if mismatched.
For cross-compatibility, be sure to name the library folder as `photoswipe`, not
`PhotoSwipe`, if any issues.

***
***
# <a name="recommended-modules"> </a>RECOMMENDED MODULES
Any reference to [Media Entity (ME)](https://drupal.org/project/media_entity) or
[Video Embed Media (VEM)[(https://drupal.org/project/video_embed_field)] is
deprecated for core Media with oEmbed at Blazy 2.x.

***
***
# <a name="features"></a>FEATURES
* Has no formatter, instead integrated into "Media switch" option as seen at
  Blazy/ Slick formatters, including Blazy Views fields for File ER and
  Media Entity.
* Supports swipeable Videos if (Video Embed) Media is installed.

***
***
# <a name="installation"> </a>INSTALLATION
Install the module as usual, more info can be found on:

[Installing Drupal 8 Modules](https://drupal.org/node/1897420)


Enable Blazy PhotoSwipe module under **Blazy** package:

`/admin/modules#edit-modules-blazy`


***
***
# <a name="configuration"> </a>CONFIGURATION
1. Go to any "Manage display" page, e.g.:
   `/admin/structure/types/manage/page/display`

2. Find a Blazy, GridStack, Splide, Slick formatter under **Manage display**.
   Or if using Views UI, add a new Views field named Blazy for File ER or Media.

3. Choose **Image to photoswipe** under **Media switch** option.
   Adjust anything else accordingly.

***
***
# <a name="configuration"> </a>HOW TO ENABLE PHOTOSWIPE 5
1. Download the library:
   + `https://github.com/dimsemenov/photoswipe/`
   + Bigger or smaller than the tested versions above might break.
2. Requires Blazy 3.x.
3. Visit `/admin/config/media/blazy`.
4. Select **PhotoSwipe 5** under **Extra settings**.
5. Be sure to use/ switch to the correct library version accordingly. Check
   folder permissions if any issues. Open the files in browsers to verify.
6. Clear cache.

## Limitations/ Tips:
1. Picture is not supported for pan-zooming, regular Responsive image is.
2. For some reasons, it must be connected to internet. It appears the library
   disables it when being [offline](https://github.com/dimsemenov/PhotoSwipe/blob/v5-beta/dist/photoswipe-lightbox.esm.js#L533). No big deal, just a headup.
3. To customize options, implement `hook_blazy_photoswipe_js_options_alter` like
   PhotoSwipe 4.
4. Be sure to provide **Thumbnail style** at blazy-related formatters for
   initial image placeholder with the same aspect ratio as the full resolution
   **Lightbox image style**.
5. Modern browsers only, no IEs. Check out your visitors before usages. See
   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#browser_compatibility

***
***
# <a name="maintainers"> </a>MAINTAINERS/CREDITS
* [Gaus Surahman](https://drupal.org/user/159062)
* [Contributors](https://www.drupal.org/node/2829380/committers)
* CHANGELOG.txt for helpful souls with their patches, suggestions and reports.


## READ MORE
See the project page on drupal.org:

[Blazy PhotoSwipe](https://drupal.org/project/blazy_photoswipe)
[Blazy PhotoSwipe help](/admin/help/blazy_photoswipe)
