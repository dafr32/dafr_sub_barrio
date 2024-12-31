CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Requirements
 * Installation
 * Configuration
 * Maintainers


INTRODUCTION
------------
The Custom Login Url allows you to redefine the url of the administration login
form.

By default, the url of the administration login form is `/user`.
For security reasons, you might want to redefine this url to another one.
This can avoid robots connection trials.


REQUIREMENTS
------------

This module requires the user module:
  - drupal/user

INSTALLATION
------------

Install the Env Libraries module as you would normally install a contributed
Drupal module. Visit https://www.drupal.org/node/1897420 for further
information.


CONFIGURATION
-------------

After enabling the Custom Login Url module, you can add your own connexion
base url into your settings.php as so :
```
/**
 * Redefine the login base  url.
 */
$settings['custom_login_pattern'] = 'my_login_url/';
```

Now you can access the login form here : 'www.my-domain.com/my_login_url/login'
The default url /user should now send a 404 response.


MAINTAINERS
-----------

 * Thomas Sécher - https://www.drupal.org/u/tsecher

Supporting organization:

 * Lycanthrop - https://www.drupal.org/lycanthrop
