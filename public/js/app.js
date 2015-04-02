'use strict';

angular.module('App', ['ngMaterial', 'ui.router', 'ngResource'])

.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'public/views/partials/home.html',
      controller: 'HomeCtrl',
    })
    .state('cart', {
      url: '/cart',
      templateUrl: 'public/views/partials/cart.html',
      controller: 'CartCtrl',
    })
    .state('checkout', {
      url: '/checkout',
      templateUrl: 'public/views/partials/checkout.html',
      controller: 'CheckoutCtrl',
    })
    ;

})
;
