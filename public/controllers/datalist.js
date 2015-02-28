'use strict';

/* jshint -W098 */
angular.module('mean.datalist').controller('DatalistController', ['$scope', 'Global', 'Datalist',
  function($scope, Global, Datalist) {
    $scope.global = Global;
    $scope.package = {
      name: 'datalist'
    };
  }
]);
