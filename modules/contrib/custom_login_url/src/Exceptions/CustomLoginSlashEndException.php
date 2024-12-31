<?php

namespace Drupal\custom_login_url\Exceptions;

/**
 * Login Slash exception.
 *
 * @package Drupal\custom_login_url\Exceptions
 */
class CustomLoginSlashEndException extends \Exception {

  /**
   * String exception.
   *
   * @const string
   */
  const MESSAGE = "The custom login url should end with a slash";

  /**
   * {@inheritdoc}
   */
  public function __construct($message = self::MESSAGE, $code = 0, $previous = NULL) {
    parent::__construct($message, $code, $previous);
  }

}
