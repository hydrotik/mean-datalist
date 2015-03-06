'use strict';

angular.module('mean.datalist').directive('datalistfield', function($compile, $filter, $timeout) {
    return {
        restrict: 'AE',

        // require option with value ^myTabs. When a directive uses this option,
        // $compile will throw an error unless the specified controller is found.
        // The ^ prefix means that this directive searches for the controller on its
        // parents (without the ^ prefix, the directive would look for the controller
        // on just its own element)
        // require: '^DataListController',

        // The transclude option changes the way scopes are nested. It makes it so that
        // the contents of a transcluded directive have whatever scope is outside the directive,
        // rather than whatever scope is on the inside. In doing so, it gives the contents access
        // to the outside scope.
        transclude: true,

        scope: {
        	operation : '@fieldOp',
        	field : '=ngModel',
        	item : '=dlModel'
        },

        link: function(scope, element, attrs, $parse) {
        	
        	
        	/*
        	$timeout(function() {
        		scope[scope.item.id] = scope.$parent.$parent[scope.item.id];
				console.log(scope[scope.item.id]);
          	}, 100);
        	
			*/
            scope.change = function() {
                //scope.$parent.item[scope.item.id] = scope.item[scope.item.id];
                //console.log(scope.$parent.item[scope.field.id]);
                //console.log(scope.item[scope.field.id]);
            };
			
            

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
		
        template: '<div class="form-group">' +
            '<label mean-token="{{::operation}}-{{::field.id}}" class="col-md-3 control-label">Item {{::field.label}}</label>' +
				'<div class="col-md-9">' +

					// Standard Input field - type="text"
					'<input ng-if="field.type == \'text\'" data-ng-model="item[field.id]" name="{{::field.id}}" type="text" class="form-control" id={{::field.id}}" placeholder="{{::field.label}}" required>' +
					// TextArea Input field - type="textarea"
					'<textarea ng-if="field.type == \'textarea\'" data-ng-model="item[field.id]" name="{{::field.id}}" id="{{::field.id}}" cols="30" rows="10" placeholder="{{::field.label}}" class="form-control" required></textarea>' +

					// TextArea Input field - type="textarea"
		            '<input type="text" ' +
		            'ng-if="field.type == \'date\'" ' +
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
				    'class="form-control" />' +

				    // Radio Button Group type="radio"
				    '<span ng-if="field.type == \'radio\'" ng-repeat="radio in field.children"> ' + 
					    '<input type="radio" ' +
					    'name="{{::field.id}}" ' +
					    'id="{{::field.id}}" ' +
					    'data-ng-model="item[field.id]" '+
					    'value="{{radio.value}}" /> {{radio.label}}&nbsp;&nbsp;&nbsp;' +
				    '</span> ' + 

				    // Checkbox type="checkbox"
				    '<span ng-if="field.type == \'checkbox\'">' + 
				    '<input type="checkbox" ' + 
			       	'data-ng-model="item[field.id]" ' +
			       	'ng-init="item[field.id]=field.selected" ' + 
			       	'ng-checked="field.selected" ' +
			       	'name="{{::field.id}}" ' +
					'id="{{::field.id}}" /> {{field.options[item[field.id]]}}</span>' + 

					// Image Upload type="image"
					
					'<div flow-init="{target: \'http://127.0.0.1:3000/upload\'}" ' + 
					'ng-if="field.type == \'image\'" ' +
				    'flow-files-submitted="$flow.upload()" ' + 
				    'flow-file-success="$file.msg = $message"> ' + 

					  	'<input type="file" flow-btn/> ' + 
					  		'Input OR Other element as upload button' + 
					  	'<span class="btn" flow-btn>Upload File</span> ' + 

					  	'<table> ' + 
					    	'<tr ng-repeat="file in $flow.files"> ' + 
					        	'<td>{{$index+1}}</td> ' + 
					        	'<td>{{file.name}}</td> ' + 
					        	'<td>{{file.msg}}</td> ' + 
					    	'</tr> ' + 
					  	'</table> ' + 
					'</div>' + 
					

				'</div>' +
			'</div>' +
        '</div>'
    };
});