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

	        },

	        template: '<div>' +
							'<div ng-repeat="choice in choices">' + 
							  '<label for="choice" ng-show="$first">Choices</label>' + 
							  '<button ng-show="$last" ng-click="addNewChoice()">Add another choice</button>' + 
							  '<input type="text" ng-model="choice.name" name="" placeholder="Enter a restaurant name">' + 
							'</div>' + 
						'</div>'
	    };
	}
]);