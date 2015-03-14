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

	        	if (scope.field.type === 'radio' && scope.operation === 'create'){
		        	var value = '';
		        	for(var i = 0; i < scope.field.children.length; i+=1){
		        		if(scope.field.children[i].hasOwnProperty('selected') && scope.field.children[i].selected) value = scope.field.children[i].value;
		        	}
		        	scope.item[scope.field.id] = value;
		        }

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