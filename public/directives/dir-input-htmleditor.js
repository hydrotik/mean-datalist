'use strict';


angular.module('mean.datalist').directive('datalistInputHtmleditor', [
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

	        template: '<text-angular ' +
						'data-ng-model="item[field.id]">' +
						'></text-angular>'
	    };
	}
]);