'use strict';

angular.module('mean.datalist').directive('datalistfield', function($compile) {
    return {
        restrict: 'AE',

        scope: {
            item: '=ngModel'
        },

        controller : function($scope){
        	
        },

        link: function(scope, element, attrs, $parse) {
        	
        	scope.lm = scope.$parent[scope.item.id];
        	console.log(scope.item.id);
        	console.log(scope.lm);

        	scope.change = function(){
        		console.log(scope.lm);
        	};

        	scope.getReference = function(key){
        		console.log(key);
        	};
        },

        compile:function(tEl,tAtr){
          	//tEl[0].removeAttribute('ng-bind-model');
            return function(scope){
				//tEl[0].setAttribute('data-ng-model',scope.$eval(tAtr.ngBindModel));
				//$compile(tEl[0])(scope);
				console.info('new compiled element:',tEl[0]);
            };
        },


		
        template: '<div class="form-group">' +
            '<label mean-token="create-{{item.id}}" class="col-md-3 control-label">Item {{item.label}}</label>' +
            '<div class="col-md-9">' +


        '<input ng-change="change()" ng-if="item.type == \'text\'" data-ng-model="item.id" name="{{item.id}}" type="text" class="form-control" id={{item.id}}" placeholder="{{item.label}}" required>' +

        '<textarea ng-change="change()" ng-if="item.type == \'textarea\'" data-ng-model="item.id" name="{{item.id}}" id="{{item.id}}" cols="30" rows="10" placeholder="{{item.label}}" class="form-control" required></textarea>' +

        '</div>' +
            '</div>' +
            '</div>'
    };
});