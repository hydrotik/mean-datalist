'use strict';


angular.module('mean.datalist').directive('datalistInputDate', [
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


	        },

	        template: '<input type="text" ' +
			            'ng-change="change()"' + 
					    'datepicker-popup="{{::dateFormat}}" ' +
					    'data-ng-model="item[field.id]" ' +
					    'is-open="opened" ' +
					    'ng-click = "opened = true" ' +
					    'max-date="maxDate" ' +
					    'datepicker-options="dateOptions" ' +
					    'date-disabled="disabled(date, mode)" ' +
					    'ng-required="true" ' +
					    'close-text="Close" ' +
					    'class="form-control" />'
	    };
	}
]);