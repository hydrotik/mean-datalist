'use strict';


angular.module('mean.datalist').directive('datalistInputTextlist', [
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
	        	console.warn(scope.field.id);

	        },

	        template: '<div>' +
						'<input ng-repeat="listitem in field.children track by $index" data-ng-model="item[field.id][$index]" name="{{::field.id}}-{{$index}}" type="text" class="form-control" id="{{::field.id}}-{{$index}}" placeholder="{{::listitem.label}}" required>' +
						'<div>'
	    };
	}
]);