'use strict';


angular.module('mean.datalist').directive('datalistInputText', [
	'$compile',
	'$filter',
	'$timeout',
	function($compile, $filter, $timeout) {
	    return {
	        restrict: 'AE',

	        //require: '^datalistfield',

	        transclude: true,

	        scope: false,

	        link: function(scope, element, attrs, $parse) {
	        	//console.warn(scope.field.id);

	        },

	        template: '<input data-ng-model="item[field.id]" name="{{::field.id}}" type="text" class="form-control" id="{{::field.id}}" placeholder="{{::field.label}}" required>'
	    };
	}
]);