<?php

namespace Drupal\custom_login_url\Routing;

use Drupal\Core\Routing\RouteSubscriberBase;
use Drupal\Core\Site\Settings;
use Drupal\custom_login_url\Exceptions\CustomLoginSlashEndException;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

/**
 * Class RouteSubscriber.
 *
 * Redefine the url of the login form.
 *
 * @package Drupal\custom_login_url\Routing
 */
class RouteSubscriber extends RouteSubscriberBase {

  /**
   * Default drupal pattern.
   *
   * @const string
   */
  const OLD_PATTERN = '/user/';

  /**
   * CONF Name.
   *
   * @const string
   */
  const CONF_NAME = 'custom_login_pattern';

  /**
   * EMPTY message.
   *
   * @const string
   */
  const EXCEPTION_EMPTY_MESSAGE = 'The custom login url pattern should not be empty';

  /**
   * Custom Pattern.
   *
   * @var string
   */
  protected $customPattern;

  /**
   * {@inheritdoc}
   */
  protected function alterRoutes(RouteCollection $collection) {

    // Modification des urls liées aux utilisateurs.
    foreach ($collection as $route) {
      if ($this->isUserRoute($route)) {
        $this->alterUserRoute($route);
      }
    }

    /* Exception for  /{static::NEW_PATTERN}
     * and not /{static::NEW_PATTERN}/login.
     */
    $collection->get('user.login')
      ->setPath(substr($this->getCustomPattern(), 0, -1));
  }

  /**
   * Return true if the route is a /user/* route.
   *
   * @param \Symfony\Component\Routing\Route $route
   *   The route.
   *
   * @return bool
   *   The state.
   */
  protected function isUserRoute(Route $route) {
    return str_starts_with($route->getPath(), static::OLD_PATTERN);
  }

  /**
   * Alter user route using custom login pattern.
   *
   * @param \Symfony\Component\Routing\Route $route
   *   The route.
   */
  protected function alterUserRoute(Route $route) {
    $pattern = '/' . preg_quote(static::OLD_PATTERN, '/') . '/';
    $new_path = preg_replace($pattern, $this->getCustomPattern(), $route->getPath(), 1);
    $route->setPath($new_path);
  }

  /**
   * Return the custom login pattern if exists.
   *
   * @return string|null
   *   The custom pattern.
   */
  protected function getCustomPattern() {
    if (is_null($this->customPattern)) {
      $this->customPattern = Settings::get(static::CONF_NAME, static::OLD_PATTERN);
      try {
        $this->validCustomPattern($this->customPattern);
      }
      catch (CustomLoginSlashEndException $e) {
        $this->customPattern .= '/';
      }
    }

    return $this->customPattern;
  }

  /**
   * Valid the given pattern for user login url.
   *
   * @param string $pattern
   *   The pattern to test.
   *
   * @return string
   *   The pattern validated.
   *
   * @throws \Exception
   */
  public function validCustomPattern($pattern): string {
    if (empty($pattern) || $pattern === '/') {
      throw new \Exception(static::EXCEPTION_EMPTY_MESSAGE);
    }
    if (substr($pattern, -1) != '/') {
      throw new CustomLoginSlashEndException();
    }

    return $pattern;
  }

}
