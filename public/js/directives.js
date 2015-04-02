'use strict';

angular.module('App')

.directive('arianeThread', function(){
  return {
    restrict: 'E',
    templateUrl: 'public/views/partials/_ariane-thread.html'
  };
})

.directive('categoryBox', function(){
  return {
    restrict: 'E',
    templateUrl: 'public/views/partials/_category-box.html'
  };
})

.directive('oFooter', function(){
  return {
    restrict: 'E',
    templateUrl: 'public/views/partials/_footer.html'
  };
})

.directive('bottomImages', function(){
  return {
    restrict: 'E',
    templateUrl: 'public/views/partials/_bottom-images.html'
  };
})

.directive('oHeader', function(){
  return {
    restrict: 'E',
    templateUrl: 'public/views/partials/_header.html'
  };
})
;
