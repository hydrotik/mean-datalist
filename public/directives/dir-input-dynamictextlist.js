'use strict';


angular.module('mean.datalist').directive('datalistInputDynamictextlist', [
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

	        	// Scope controlled by datalist-input-display.js
	        },

	        template: '<div>' +
							'<div ng-repeat="choice in field.children track by $index">' + 
								'<input type="text" class="form-control" data-ng-model="item[field.id][$index]" name="{{::field.id}}-{{$index}}" placeholder="Enter">' + 
							  	'<div class="btn btn-default" ng-show="$last" ng-click="addNewChoice()">Add another choice</div>' + 
							'</div>' + 
						'</div>'

		};
	}
]);