'use strict';

//DataList service used for datalist REST endpoint
angular.module('mean.datalist').factory('DataListTree', ['$http',
    function($http) {
        var _factory = {};

        _factory.fetchFile = function(file) {
            return $http.get('/api/resource?resource=' + encodeURIComponent(file));
        };

        return _factory;
    }
]);