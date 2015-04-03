'use strict';

angular.module('Ecommerce', ['ngMaterial', 'ui.router', 'ngResource'])

        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
                    .state('main', {
                        url: '/',
                        controller: 'MainCtrl',
                        templateUrl: 'public/views/inner/main.html',
                    })


                    .state('checkout', {
                        url: '/checkout',
                        controller: 'PageCheckoutCtrl',
                        templateUrl: 'public/views/inner/checkout.html',
                    })


                    .state('caddie', {
                        url: '/caddie',
                        controller: 'CaddieCtrl',
                        templateUrl: 'public/views/inner/caddie.html',
                    })

                    ;

        })
        ;
