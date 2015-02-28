'use strict';

//Setting up route
angular.module('mean.datalist').config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    // states for my app
    $stateProvider
      .state('datalist', {
        url: '/datalist',
        templateUrl: 'datalist/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create item', {
        url: '/datalist/create',
        templateUrl: 'datalist/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit item', {
        url: '/datalist/:itemid/edit',
        templateUrl: 'datalist/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('item by id', {
        url: '/datalist/:itemid',
        templateUrl: 'datalist/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
