'use strict';

angular.module('mean.datalist').controller('DataListController', [
    '$scope',         // Angular $scope object
    '$stateParams',   // UI-Router $stateParams object
    '$location',      // Angular $location object
    '$timeout',       // Angular $timeout object
    '$sce',           // Angular $sce safe content object
    'Global',         // Meain.io Global object
    'DataList',       // DataList rest endpoint service
    'DataListModel',  // DataList model/local schema service
    'DataListTree',   // Datalist Tree rest endpoint service
  function($scope, $stateParams, $location, $timeout, $sce, Global, DataList, DataListModel, DataListTree) {
      /*
          Start Global/Initialization Functions
      */

      // Main Global
      $scope.global = Global;
      
      // Global Authorization check
      $scope.hasAuthorization = function(item) {
          if (!item || !item.user) return false;
          return $scope.global.isAdmin || item.user._id === $scope.global.user._id;
      };

      // Return the Client Side Schema from the service
      $scope.schema = DataListModel.getFields();

      // Initialize a parent item object. TODO remove _key prop if not being used.
      $scope.item = {
          _key: 'empty'
      };

      // Helper function in the servic for clearing the field model data
      DataListModel.clearFieldModels($scope.item);

      // Helper function for checking data TODO move to global helper/util service
      $scope.isDate = function(date){
        //TODO Clean this up!
        if(!isNaN(parseFloat(date)) && isFinite(date)) return false;
        var d = new Date(date);
        return Object.prototype.toString.call(d) === '[object Date]' ? true : angular.isDate(d);
      };



      /*
          Start CRUD Functions
      */

      // Main Create function for conenction to endpoint
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

      // Main Remove function for conenction to endpoint
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

      // Main Update function for conenction to endpoint
      $scope.update = function(isValid) {
          if (isValid) {
              var item = $scope.item;
              if (!item.updated) {
                  item.updated = [];
              }
              item.updated.push({date : new Date().getTime(), user : $scope.global.user});

              item.$update(function() {
                  $location.path('datalist/' + item._id);
              });
          } else {
              $scope.submitted = true;
          }
      };

      // Main Find All function for conenction to endpoint
      $scope.find = function() {
          DataList.query(function(items) {
              $scope.items = items;
          });
      };

      // Main Find One by ID function for conenction to endpoint
      $scope.findOne = function() {
          DataList.get({
              itemid: $stateParams.itemid
          }, function(item) {
              $scope.item = item;
          });
      };



      /*
          Start Tree Functions
      */

      $scope.fileViewer = 'Please select a file to view its contents';

      $scope.contextMenu = {
          'Menu 1': {
              'label': 'Menu 1',
              'action': function(obj) {
                  console.log(obj);
                  alert('You clicked ' + obj.item.label);
              }
          },
          'Menu 2': {
              'label': 'Menu 2',
              'action': function(obj) {
                  console.log(obj);
                  alert('You clicked ' + obj.item.label);
              }
          }
      };

      $scope.tree_core = {
        
        multiple: false,  // disable multiple node selection

        check_callback: function (operation, node, node_parent, node_position, more) {
            // operation can be 'create_node', 'rename_node', 'delete_node', 'move_node' or 'copy_node'
            // in case of 'rename_node' node_position is filled with the new node name

            if (operation === 'move_node') {
                return false;   // disallow all dnd operations
            }
            return true;  // allow all other operations
        }
      };

      $scope.nodeSelected = function(e, data) {
        var _l = data.node.li_attr;
        if (_l.isLeaf) {
          console.log(_l);
          DataListTree.fetchFile(_l.base).then(function(data) {
            // $sce.trustAsHtml(scope.item[scope.field.id]);

            if(_l.base.toLowerCase().split('.').pop() === 'pdf'){
              console.log('Loading HTML File!');
            }

            var _d = data.data;
            if (typeof _d === 'object') {
              //http://stackoverflow.com/a/7220510/1015046//
              _d = JSON.stringify(_d, undefined, 2);
            }
            $scope.fileViewer = $sce.trustAsHtml(_d);

          });
        } else {

          //http://jimhoskins.com/2012/12/17/angularjs-and-apply.html//
          $scope.$apply(function() {
            $scope.fileViewer = 'Please select a file to view its contents';
          });
        }
      };
  }
]);
