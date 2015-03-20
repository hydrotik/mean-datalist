'use strict';

//DataList service used for datalist REST endpoint
angular.module('mean.datalist').factory('DataListTree', ['$http',
    function($http) {
        var _factory = {};

        _factory.fetchFile = function(file, download) {
        	if(!download) download = false;
            return $http.get('/api/resource?resource=' + encodeURIComponent(file)) + '&download=' + download;
        };

        return _factory;
    }
]);