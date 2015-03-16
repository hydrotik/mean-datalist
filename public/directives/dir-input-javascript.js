'use strict';


angular.module('mean.datalist').directive('datalistInputJavascript', [
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

	        template: '<div ui-ace="{onLoad: aceJSLoaded}" ' +
						'data-ng-model="item[field.id]" ' +
						'style="width: 100%;" ' + 
						'id="editor-javascript"></div>'
	    };
	}
]);