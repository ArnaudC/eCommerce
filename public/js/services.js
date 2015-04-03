'use strict';
angular.module('Ecommerce')
        .service('ObjetsService', function ($resource, $filter, FindCategoryService, RechercherService) {
            var Item = $resource('resources/objets.json');
            var items = Item.query();
            return {
                query: function () {
                    var res = items;
                    var categoryName = FindCategoryService.getFilter();
                    var search = RechercherService.getSearch();
                    if (categoryName) {
                        res = res.filter(function (item) {
                            return item.category === categoryName;
                        });
                    }
                    if (search) {
                        res = res.filter(function (item) {
                            return (item.name.indexOf(search) >= 0) ||
                                    (item.description.indexOf(search) >= 0);
                        });
                    }
                    return res;
                }
            };
        })
        .service('CaddieService', function () {
            var items = [];
            function findpos(name) {
                var k = 0;
                while (k < items.length) {
                    if (items[k].name === name) {
                        return k;
                    }
                    k += 1;
                }
                return -1;
            }
            return {
                add: function (item, quantity) {
                    quantity = quantity || 1;
                    item.quantity = quantity;
                    var index = findpos(item.name);
                    if (index >= 0) {
                        items[index].quantity += quantity;
                    } else {
                        items.push(item);
                    }
                    return this;
                },
                remove: function (itemName) {
                    items = items.filter(function (item) {
                        return item.name !== itemName;
                    });
                    return this;
                },
                clear: function () {
                    items = [];
                    return this;
                },
                get: function () {
                    return items;
                }
            };
        })
        .service('FindCategoryService', function ($resource) {
            var Category = $resource('resources/categories.json');
            var filter = '';
            return {
                query: function () {
                    return Category.query();
                },
                getFilter: function () {
                    return filter;
                },
                setFilter: function (newFilter) {
                    filter = newFilter;
                }
            };
        })
        .service('RechercherService', function () {
            var search = '';
            return {
                getSearch: function () {
                    return search;
                },
                setSearch: function (newSearch) {
                    search = newSearch;
                }
            };
        })
        .service('UtilisateursService', function ($resource) {
            var User = $resource('resources/utilisateurs.json');
            var users = User.query();
            return {
                query: function () {
                    return users;
                },
                isValid: function (email, password) {
                    return users.some(function (u) {
                        return u.email === email && u.password === password;
                    });
                }
            };
        })
        .service('PathService', function () {
            var locations = [];
            return {
                add: function (name, url) {
                    locations.push({name: name, url: url});
                    return this;
                },
                remove: function () {
                    locations.pop();
                    return this;
                },
                get: function () {
                    return locations;
                },
                clear: function () {
                    locations = [];
                    return this;
                }
            };
        })



        .service('DisplayMessageService', function ($mdDialog) {
            function GreetingController($scope, $mdDialog, employee) {
                // Assigned from construction <code>locals</code> options...
                $scope.employee = employee;

                $scope.closeDialog = function () {
                    // Easily hides most recent dialog shown...
                    // no specific instance reference is needed.
                    $mdDialog.hide();
                };
            }

            return {
                simpleToast: function (msg) {
                    $mdDialog.show({
                        template:
                                '<md-dialog>' +
                                '  <md-content>' + msg + '</md-content>' +
                                '</md-dialog>',
                    });
                    window.setTimeout(function () {
                        $mdDialog.hide();
                    }, 1000);
                }
            };
        });


