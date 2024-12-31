<?php

namespace Drupal\custom_login_url\KernelSubscriber;

use Drupal\Core\Routing\RouteMatchInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Class KernelSubscriber.
 *
 * Subscribe to the kernel event and throw an error on official user route.
 *
 * @package Drupal\custom_login\KernelSubscriber
 */
class KernelSubscriber implements EventSubscriberInterface {

  /**
   * Route match.
   *
   * @var \Drupal\Core\Routing\RouteMatchInterface
   */
  protected $routeMatch;

  /**
   * KernelSubscriber constructor.
   *
   * @param \Drupal\Core\Routing\RouteMatchInterface $route_match
   *   The route match.
   */
  public function __construct(RouteMatchInterface $route_match) {
    $this->routeMatch = $route_match;
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    return [
      KernelEvents::EXCEPTION => [
        ['onException', 100],
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function onException(ExceptionEvent $event): void {
    if ($this->routeMatch->getRouteName() === 'user.page') {
      // Do not redirect to user page if user not connected and page not found.
      $event->setThrowable(new NotFoundHttpException());
    }
  }

}
