'use strict';


angular.module('mean.datalist').directive('datalistInputRadio', [
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

	        template: '<span ng-repeat="radio in field.children"> ' + 
						    '<input type="radio" ' +
						    'name="{{::field.id}}" ' +
						    'id="{{::field.id}}" ' +
						    'data-ng-model="item[field.id]" '+
						    'value="{{radio.value}}" /> {{radio.label}}&nbsp;&nbsp;&nbsp;' +
					    '</span>'
	    };
	}
]);