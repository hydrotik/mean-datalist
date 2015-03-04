'use strict';

angular.module('mean.datalist').controller('DataListController', [
    '$scope',
    '$stateParams',
    '$location',
    '$timeout',
    'Global',
    'DataList',
    'DataListModel',
  function($scope, $stateParams, $location, $timeout, Global, DataList, DataListModel) {
    $scope.global = Global;
    $scope.hasAuthorization = function(item) {
      if (!item || !item.user) return false;
      return $scope.global.isAdmin || item.user._id === $scope.global.user._id;
    };
    
    


    $scope.item = {
      _key : 'empty'
    };

    DataListModel.clearFieldModels($scope.item);

    $scope.create = function(isValid) {
      console.warn('$scope.create()');

      console.warn($scope.item);
      
      var data = DataListModel.getData($scope.item);

      console.warn(data);


      if (isValid) {
        var item = new DataList(data);
        item.$save(function(response) {
          $location.path('datalist/' + response._id);
        });

        DataListModel.clearFieldModels($scope.item);
      } else {
        $scope.submitted = true;
      }
    };


    $scope.remove = function(item) {
      if (item) {
        item.$remove(function(response) {
          for (var i in $scope.items) {
            if ($scope.items[i] === item) {
	      $scope.items.splice(i,1);
            }
          }
          $location.path('datalist');
        });
      } else {
        $scope.item.$remove(function(response) {
          $location.path('datalist');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var item = $scope.item;
        console.log(item);
        if(!item.updated) {
          item.updated = [];
	}
        item.updated.push(new Date().getTime());

        item.$update(function() {
          $location.path('datalist/' + item._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      DataList.query(function(obj) {
        $scope.schema = DataListModel.parseTree(obj.tree);
        $scope.items = obj.items;
      });
    };

    $scope.findOne = function() {
      DataList.get({
        itemid: $stateParams.itemid
      }, function(obj) {
        $scope.schema = DataListModel.parseTree(obj.tree);
        $scope.item = obj.item;
        console.log(obj);
      });
    };
  }
]);
