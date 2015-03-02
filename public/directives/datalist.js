'use strict';

angular.module('mean.datalist').directive('datalistfield', function($compile) {
    return {
        restrict: 'AE',

        scope: {
            item: '=ngModel'
        },

        link: function(scope, element, attrs, $parse) {
        	scope.change = function(){
        		scope.$parent.$parent[scope.item.id] = scope[scope.item.id];
        	};
        },
		
        template: '<div class="form-group">' +
            '<label mean-token="create-{{item.id}}" class="col-md-3 control-label">Item {{item.label}}</label>' +
            '<div class="col-md-9">' +


        '<input ng-change="change()" ng-if="item.type == \'text\'" data-ng-model="$parent[item.id]" name="{{item.id}}" type="text" class="form-control" id={{item.id}}" placeholder="{{item.label}}" required>' +

        '<textarea ng-change="change()" ng-if="item.type == \'textarea\'" data-ng-model="$parent[item.id]" name="{{item.id}}" id="{{item.id}}" cols="30" rows="10" placeholder="{{item.label}}" class="form-control" required></textarea>' +

        '</div>' +
            '</div>' +
            '</div>'
    };
});