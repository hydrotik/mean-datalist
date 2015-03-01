'use strict';

angular.module('mean.datalist').directive('datalistfield', function(){
   return {
       restrict: 'EA',
       scope: {
	      item: '=fieldBind'
	   },
	   link: function(scope, element, attrs) {
            scope.fieldmodel = scope.$parent[scope.item.id];
       },
       template: '<div class="form-group">' + 
	      '<label mean-token="create-{{item.id}}" class="col-md-3 control-label">Item {{item.label}}</label>' + 
	      '<div class="col-md-9">' + 
	        '<input name="{{item.id}}" type="text" class="form-control" data-ng-model="fieldmodel" id={{item.id}}" placeholder="{{item.label}}" required>' + 
	        '</div>' + 
	      '</div>' + 
	    '</div>'
   };
});