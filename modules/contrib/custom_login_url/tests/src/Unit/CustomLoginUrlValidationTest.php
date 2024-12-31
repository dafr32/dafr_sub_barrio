<?php

namespace Drupal\Tests\custom_login_url\Unit;

use Drupal\custom_login_url\Exceptions\CustomLoginSlashEndException;
use Drupal\custom_login_url\Routing\RouteSubscriber;
use Drupal\Tests\UnitTestCase;

/**
 * Test description.
 *
 * @group custom_login_url
 */
class CustomLoginUrlValidationTest extends UnitTestCase {

  /**
   * The route subscriber.
   *
   * @var \Drupal\custom_login_url\Routing\RouteSubscriber
   */
  protected RouteSubscriber $routeSubscriber;

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();
    $this->routeSubscriber = new RouteSubscriber();
  }

  /**
   * Tests error when url is empty.
   *
   * @throws \Exception
   */
  public function testEmpty() {
    $this->expectExceptionMessage(RouteSubscriber::EXCEPTION_EMPTY_MESSAGE);
    $this->routeSubscriber->validCustomPattern('');
  }

  /**
   * TEst error when url does not end with a slash.
   *
   * @throws \Exception
   */
  public function testNotEndingWithSlash() {
    $this->expectException(CustomLoginSlashEndException::class);
    $this->routeSubscriber->validCustomPattern('random');
  }

}
