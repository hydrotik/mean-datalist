'use strict';

angular.module('mean.datalist').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('datalist example page', {
      url: '/datalist/example',
      templateUrl: 'datalist/views/index.html'
    });
  }
]);
