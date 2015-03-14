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
	        	console.warn(scope.field.id);

	        	// Scope controlled by datalist-input-display.js
	        },

	        template: '<div>' +
							'<div ng-repeat="choice in choices">' + 
								'<input type="text" class="form-control" ng-model="choice.name" name="" placeholder="Enter">' + 
							  	'<button ng-show="$last" ng-click="addNewChoice()">Add another choice</button>' + 
							'</div>' + 
						'</div>'
	    };
	}
]);