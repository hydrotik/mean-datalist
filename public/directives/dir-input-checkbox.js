'use strict';


angular.module('mean.datalist').directive('datalistInputCheckbox', [
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

	        template: '<span>' + 
					    '<input type="checkbox" ' + 
				       	'data-ng-model="item[field.id]" ' +
				       	'ng-init="item[field.id]=field.selected" ' + 
				       	'ng-checked="field.selected" ' +
				       	'name="{{::field.id}}" ' +
						'id="{{::field.id}}" /> {{field.options[item[field.id]]}}</span>'
	    };
	}
]);