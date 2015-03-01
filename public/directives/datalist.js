'use strict';

angular.module('mean.datalist').directive('datalistfield', function(){
   return {
       restrict: 'EA',
       scope: {
	      item: '=fieldBind'
	   },
       template: '<div class="form-group">' + 
	      '<label mean-token="create-{{item.id}}" class="col-md-3 control-label">Item {{item.label}}</label>' + 
	      '<div class="col-md-9">' + 
	        '<input name="{{item.id}}" type="text" class="form-control" data-ng-model="{{item.id}}" id={{item.id}}" placeholder="{{item.label}}" required>' + 
	        '</div>' + 
	      '</div>' + 
	    '</div>'
   };
});