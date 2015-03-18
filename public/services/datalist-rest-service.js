'use strict';

//DataList service used for datalist REST endpoint
angular.module('mean.datalist').factory('DataList', ['$resource',
    function($resource) {
        return $resource('datalist/:itemid', {
            itemid: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);