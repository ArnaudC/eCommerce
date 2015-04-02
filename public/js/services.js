'use strict';

angular.module('App')

.service('ArianeService', function(){
  var locations = [];

  return {
    add: function(name, url){
      locations.push({name: name, url: url});
      return this;
    },
    remove: function(){
      locations.pop();
      return this;
    },
    get: function(){
      return locations;
    },
    clear: function(){
      locations = [];
      return this;
    }
  };
})

.service('CartService', function(){
  var items = [];

  function indexOfItem(name){
    var i = 0;
    while(i< items.length){
      if(items[i].name === name){
        return i;
      }
      i += 1;
    }
    return -1;
  }

  return {
    add: function(item, quantity){
      quantity = quantity || 1;
      item.quantity = quantity;

      var index = indexOfItem(item.name);

      if(index >= 0){
        items[index].quantity += quantity;
      } else {
        items.push(item);
      }

      return this;
    },
    remove: function(itemName){
      items = items.filter(function(item){
        return item.name !== itemName;
      });

      return this;
    },
    clear: function(){
      items = [];
      return this;
    },
    get: function(){
      return items;
    }
  };
})

.service('ToastService', function($mdToast){
  return {
    simpleToast: function(msg){
      $mdToast.show(
        $mdToast.simple()
          .content(msg)
          .position('fit bottom right')
          .hideDelay(3000)
      );
    }
  };
})

.service('ItemService', function($resource, $filter, CategoryService, SearchService){
  var Item = $resource('resources/items.json');
  var items = Item.query();

  return {
    query: function(){
      var res = items;
      var categoryName = CategoryService.getFilter();
      var search = SearchService.getSearch();

      if(categoryName){
        res = res.filter(function(item){
          return item.category === categoryName;
        });
      }

      if(search){
        res = res.filter(function(item){
          return (item.name.indexOf(search) >= 0) ||
          (item.description.indexOf(search) >= 0);
        });
      }

      return res;
    }
  };
})

.service('CategoryService', function($resource){
  var Category = $resource('resources/categories.json');
  var filter = '';

  return {
    query: function(){
      return Category.query();
    },
    getFilter: function(){
      return filter;
    },
    setFilter: function(newFilter){
      filter = newFilter;
    }
  };
})

.service('SearchService', function(){
  var search = '';

  return {
    getSearch: function(){
      return search;
    },
    setSearch: function(newSearch){
      search = newSearch;
    }
  };
})

.service('UserService', function($resource){
  var User = $resource('resources/users.json');
  var users = User.query();

  return {
    query: function(){
      return users;
    },
    isValid: function(email, password){
      return users.some(function(u){
        return u.email === email &&
        u.password === password;
      });
    }
  };
})

;
