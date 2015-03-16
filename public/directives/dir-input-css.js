'use strict';


angular.module('mean.datalist').directive('datalistInputCss', [
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

	        template: '<div ui-ace="{onLoad: aceCSSLoaded}" ' +
						'data-ng-model="item[field.id]" ' +
						'style="width: 100%;" ' + 
						'id="editor-css"></div>'
	    };
	}
]);