'use strict';


angular.module('mean.datalist').directive('datalistInputPdf', [
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

	        template: '<input ' +
						'type="file" ' +
						'data-ng-model="item[field.id]" ' +
						'ng-if="field.type == \'pdf\'" ' + 
						'name="{{::field.id}}" ' +
						'onchange="angular.element(this).scope().imageUpdate()" ' +
						'accept="application/pdf" />'
	    };
	}
]);