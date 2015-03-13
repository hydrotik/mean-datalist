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
	        	console.warn(scope.field.id);

	        	if (scope.field.type === 'date'){

	            	scope.dateFormat = 'dd-MMMM-yyyy';
	            	

	            	scope.today = function() {
		                scope.item[scope.field.id] = $filter('date')(new Date(), scope.dateFormat);
		                //scope.item[scope.field.id] = new Date();
		            };

		            scope.open = function($event) {
		                $event.preventDefault();
		                $event.stopPropagation();

		                $timeout( function(){
					     scope.opened = true;  
					  	}, 50);
		            };

		            scope.disabled = function(date, mode) {
					    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
					};

		            scope.dateOptions = {
		                formatYear: 'yy',
		                startingDay: 1
		            };
		            scope.today();
		            scope.opened = false;  
		        }

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