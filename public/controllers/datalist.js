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

      $scope.schema = DataListModel.getFields();


      $scope.item = {
          _key: 'empty'
      };

      DataListModel.clearFieldModels($scope.item);

      $scope.isDate = function(date){
        //TODO Clean this up!
        if(!isNaN(parseFloat(date)) && isFinite(date)) return false;
        var d = new Date(date);
        return Object.prototype.toString.call(d) === '[object Date]' ? true : angular.isDate(d);
      };

      $scope.create = function(isValid) {
          var data = DataListModel.getData($scope.item);

          if (isValid) {
              var item = new DataList(data);
              item.$save(function(response) {
                  $location.path('datalist/' + response._id);
                  
              });

              $timeout(function() {
                    DataListModel.clearFieldModels($scope.item);
                  }, 100);

              
          } else {
              $scope.submitted = true;
          }
      };


      $scope.remove = function(item) {
          if (item) {
              item.$remove(function(response) {
                  for (var i in $scope.items) {
                      if ($scope.items[i] === item) {
                          $scope.items.splice(i, 1);
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
              if (!item.updated) {
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
          DataList.query(function(items) {
              $scope.items = items;
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
