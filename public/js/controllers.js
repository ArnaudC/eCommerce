'use strict';
angular.module('Ecommerce')
        .controller('PageCheckoutCtrl', function ($scope, PathService, UtilisateursService, DisplayMessageService) {
            PathService
                    .clear()
                    .add('Home', '')
                    .add('Checkout', '/checkout');
            $scope.email = '';
            $scope.password = '';
            $scope.userLogin = function () {
                var res = UtilisateursService.isValid($scope.email, $scope.password);
                if (res) {
                    DisplayMessageService.simpleToast('Login from ' + $scope.email + ' sucessfull.');
                } else {
                    DisplayMessageService.simpleToast('Bad login/password');
                }
            };
            $scope.user = {
                name: '',
                phone: '',
                email: '',
                address: '',
                deliveryAdress: '',
                billingAdress: '',
                password: ''
            };
            $scope.userRegister = function () {
                if ($scope.formRegister.$valid) {
                    DisplayMessageService.simpleToast('Congratulation : New user created. Welcome ' + $scope.user.email + ' !');
                } else {
                    DisplayMessageService.simpleToast('Please fill all fields, mail must contain "@".');
                }
            };
            $scope.showRegisterForm = false;
            $scope.showInput = function () {
                $scope.showRegisterForm = !$scope.showRegisterForm;
            };

        })
        .controller('ItemListCtrl', function ($scope, ObjetsService, FindCategoryService, RechercherService) {
            $scope.$watch(FindCategoryService.getFilter, function (oldValue, newValue) {
                $scope.items = ObjetsService.query();
            });
            $scope.$watch(RechercherService.getSearch, function (oldValue, newValue) {
                $scope.items = ObjetsService.query();
            });
            $scope.sorts = [
                'price',
                'name',
                'description'
            ];
            $scope.sortCriteria = $scope.sorts[0];
            $scope.sortReverse = false;
        })
        .controller('MainCtrl', function ($scope, $anchorScroll, $location, PathService, CaddieService, DisplayMessageService) {
            PathService
                    .clear()
                    .add('Home', '')
                    .add('His', '')
                    .add('VULPUTATE ADIPISCING', '');
            $scope.optionsHidden = false;
            $scope.hideSort = function () {
                $scope.optionsHidden = !$scope.optionsHidden;
            };
            $scope.newItem = function (item) {
                CaddieService.add(item);
                DisplayMessageService.simpleToast('"' + item.name + '"' + ' added to the item list.');
            };
        })
        .controller('CaddieCtrl', function ($scope, PathService, CaddieService) {
            PathService
                    .clear()
                    .add('Home', '')
                    .add('Cart', '');
            var finalCost = function () {
                var res = 0;
                $scope.items.map(function (i) {
                    res += i.price * Math.abs(i.quantity);
                });
                return res;
            };
            $scope.items = CaddieService.get();
            $scope.lastitem = $scope.items[$scope.items.length - 1]; // used for the cart.
            $scope.isEmpty = function () {
                return $scope.items.length === 0;
            };
            $scope.remove = function (itemName) {
                $scope.items = CaddieService.remove(itemName).get();
                $scope.actualiserPrix();
            };
            $scope.totalPrice = finalCost();
            $scope.actualiserPrix = function () {
                $scope.totalPrice = finalCost();
            };
        })
        .controller('PathCtrl', function ($scope, PathService) {
            $scope.add = PathService.add;
            $scope.remove = PathService.remove;
            $scope.locations = PathService.get();

        })
        .controller('CategoryCtrl', function ($scope, FindCategoryService) {
            $scope.categories = FindCategoryService.query();
            $scope.selectCategory = function (categoryName) {
                FindCategoryService.setFilter(categoryName, $scope);
            };
        })
        .controller('RechercherCtrl', function ($scope, RechercherService) {
            $scope.search = RechercherService.getSearch();
            $scope.setSearch = RechercherService.setSearch;
        })
        .controller('CountCtrl', function ($scope, CaddieService) {
            $scope.$watch(CaddieService.get, function (oldValue, newValue) {
                $scope.cartCount = CaddieService.get().length;
            }, true);
        })
        ;