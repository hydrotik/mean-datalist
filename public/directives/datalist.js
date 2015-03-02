'use strict';

angular.module('mean.datalist').directive('datalistfield', function($compile, $filter, $timeout) {
    return {
        restrict: 'AE',

        scope: {
            item: '=ngModel'
        },

        link: function(scope, element, attrs, $parse) {

        	console.warn(scope.item.id + ': ' + scope.item.type);

        	scope.dateFormat = 'dd-MMMM-yyyy';

            scope.change = function() {
                scope.$parent.$parent[scope.item.id] = $filter('date')(scope[scope.item.id], scope.dateFormat);
                console.log(scope.$parent.$parent[scope.item.id]);
            };

            scope.today = function() {
                scope[scope.item.id] = $filter('date')(new Date(), scope.dateFormat);
                //scope[scope.item.id] = new Date();
            };

            if (scope.item.type === 'date'){
            	scope.today();

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

	            scope.opened = false;  
	        }
        },
		
        template: '<div class="form-group">' +
            '<label mean-token="create-{{item.id}}" class="col-md-3 control-label">Item {{item.label}}</label>' +
				'<div class="col-md-9">' +

					// Standard Input field - type="text"
					'<input ng-change="change()" ng-if="item.type == \'text\'" data-ng-model="$parent[item.id]" name="{{item.id}}" type="text" class="form-control" id={{item.id}}" placeholder="{{item.label}}" required>' +
					// TextArea Input field - type="textarea"
					'<textarea ng-change="change()" ng-if="item.type == \'textarea\'" data-ng-model="$parent[item.id]" name="{{item.id}}" id="{{item.id}}" cols="30" rows="10" placeholder="{{item.label}}" class="form-control" required></textarea>' +

					// TextArea Input field - type="textarea"

					//'<p class="input-group" ng-if="item.type == \'date\'">' +
		              //'<input ng-change="change()" type="text" class="form-control" datepicker-popup="{{$parent.format}}" data-ng-model="$parent[item.id]" is-open="opened" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="true" close-text="Close" />' +
		              //'</p>' +

		              '<input type="text" ' +
		               'ng-if="item.type == \'date\'" ' +
		               'ng-change="change()"' + 
				       'datepicker-popup="{{dateFormat}}" ' +
				       'ng-model="$parent[item.id]" ' +
				       'is-open="opened" ' +
				       'ng-click = "opened = true" ' +
				       'max-date="maxDate" ' +
				       'datepicker-options="dateOptions" ' +
				       'date-disabled="disabled(date, mode)" ' +
				       'ng-required="true" ' +
				       'close-text="Close" ' +
				       'class="form-control" />' +



		            



				'</div>' +
			'</div>' +
        '</div>'
    };
});