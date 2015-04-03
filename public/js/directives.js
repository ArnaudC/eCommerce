'use strict';
angular.module('Ecommerce')
        .directive('oFooter', function () {
            return {
                templateUrl: 'public/views/inner/footer.html',
                restrict: 'E'
            };
        })
        .directive('arianeThread', function () {
            return {
                templateUrl: 'public/views/inner/path.html',
                restrict: 'E'
            };
        })
        .directive('oHeader', function () {
            return {
                templateUrl: 'public/views/inner/header.html',
                restrict: 'E'
            };
        })
        .directive('categoryBox', function () {
            return {
                templateUrl: 'public/views/inner/catList.html',
                restrict: 'E'
            };
        })
        .directive('bottomImages', function () {
            return {
                templateUrl: 'public/views/inner/pictures.html',
                restrict: 'E'
            };
        });
