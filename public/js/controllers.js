'use strict';


angular.module('App')

        .controller('ItemListCtrl', function ($scope, ItemService, CategoryService, SearchService) {
            $scope.$watch(CategoryService.getFilter, function (oldValue, newValue) {
                $scope.items = ItemService.query();
            });

            $scope.$watch(SearchService.getSearch, function (oldValue, newValue) {
                $scope.items = ItemService.query();
            });

            $scope.sorts = [
                'price',
                'name',
                'description'
            ];
            $scope.sortCriteria = $scope.sorts[0];
            $scope.sortReverse = false;

        })

        .controller('HomeCtrl', function ($scope, $anchorScroll, $location, ArianeService, CartService, ToastService) {
            ArianeService
                    .clear()
                    .add('Home', '')
                    .add('His', '')
                    .add('Lorem ipsum', '');

            $scope.optionsHidden = false;

            $scope.toggleHideOptions = function () {
                $scope.optionsHidden = !$scope.optionsHidden;
            };

            $scope.addToCart = function (item) {
                CartService.add(item);
                ToastService.simpleToast('"' + item.name + '"' + ' was added to your cart.');
            };


        })

        .controller('CheckoutCtrl', function ($scope, ArianeService, UserService, ToastService) {
            ArianeService
                    .clear()
                    .add('Home', '')
                    .add('His', '')
                    .add('Checkout', '/checkout');

            $scope.email = '';
            $scope.password = '';
            $scope.login = function () {
                var res = UserService.isValid($scope.email, $scope.password);

                if (res) {
                    ToastService.simpleToast('Welcome back ' + $scope.email + ' !');
                } else {
                    ToastService.simpleToast('Wrong login/password');
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

            $scope.register = function () {
                if ($scope.formRegister.$valid) {
                    ToastService.simpleToast('Welcome ' + $scope.user.email + ' !');
                } else {
                    ToastService.simpleToast('The form is not valid, fields are missing');
                }
            };

            $scope.showRegisterForm = false;
            $scope.toggleRegisterForm = function () {
                $scope.showRegisterForm = !$scope.showRegisterForm;
            };

        })

        .controller('CartCtrl', function ($scope, ArianeService, CartService) {
            ArianeService
                    .clear()
                    .add('Home', '')
                    .add('His', '')
                    .add('Cart', '');

            var getTotalPrice = function () {
                var res = 0;

                $scope.items.map(function (i) {
                    res += i.price * Math.abs(i.quantity);
                });

                return res;
            };

            $scope.items = CartService.get();

            $scope.isEmpty = function () {
                return $scope.items.length === 0;
            };

            $scope.remove = function (itemName) {
                $scope.items = CartService.remove(itemName).get();
                $scope.updateTotalPrice();
            };

            $scope.totalPrice = getTotalPrice();

            $scope.updateTotalPrice = function () {
                $scope.totalPrice = getTotalPrice();
            };

        })

        .controller('PresentationCtrl', function ($scope) {

        })

        .controller('ArianeCtrl', function ($scope, ArianeService) {
            $scope.add = ArianeService.add;
            $scope.remove = ArianeService.remove;
            $scope.locations = ArianeService.get();

        })

        .controller('CategoryCtrl', function ($scope, CategoryService) {
            $scope.categories = CategoryService.query();
            $scope.selectCategory = function (categoryName) {
                CategoryService.setFilter(categoryName, $scope);
            };
        })

        .controller('SearchCtrl', function ($scope, SearchService) {
            $scope.search = SearchService.getSearch();
            $scope.setSearch = SearchService.setSearch;
        })

        .controller('HeaderCtrl', function ($scope, CartService) {
            $scope.$watch(CartService.get, function (oldValue, newValue) {
                $scope.cartCount = CartService.get().length;
            }, true);


        })

        ;
