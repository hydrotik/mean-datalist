'use strict';

angular.module('mean.datalist').controller('DataListController', [
    '$scope',
    '$stateParams',
    '$location',
    'Global',
    'DataList',
    'DataListModel',
  function($scope, $stateParams, $location, Global, DataList, DataListModel) {
    $scope.global = Global;
    $scope.hasAuthorization = function(item) {
      if (!item || !item.user) return false;
      return $scope.global.isAdmin || item.user._id === $scope.global.user._id;
    };
    
    $scope.schema = DataListModel.getFields();


    DataListModel.clearFieldModels($scope);

    $scope.create = function(isValid) {
      console.warn('$scope.create()');
      
      var data = DataListModel.getData($scope);


      if (isValid) {
        var item = new DataList(data);
        item.$save(function(response) {
          $location.path('datalist/' + response._id);
        });

        DataListModel.clearFieldModels($scope);
      } else {
        $scope.submitted = true;
      }
    };


    $scope.remove = function(item) {
      if (item) {
        item.$remove(function(response) {
          for (var i in $scope.datalist) {
            if ($scope.datalist[i] === item) {
	      $scope.datalist.splice(i,1);
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
      DataList.query(function(datalist) {
        $scope.datalist = datalist;


      });
    };

    $scope.findOne = function() {
      DataList.get({
        itemid: $stateParams.itemid
      }, function(item) {
        $scope.item = item;
      });
    };









    




  }
]);
