'use strict';

/*
angular.module('mean.datalist').config(['flowFactoryProvider', function (flowFactoryProvider) {
  flowFactoryProvider.defaults = {
      target: 'http://127.0.0.1:3000/api/upload/',
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 1,
      testChunks:false,
      query: 'injectUploadID',
      permanentErrors: [415, 500, 501]
    };
  flowFactoryProvider.on('catchAll', function (event) {
    console.log('catchAll', arguments);
  });
  // Can be used with different implementations of Flow.js
  // flowFactoryProvider.factory = fustyFlowFactory;
}]);
*/


angular.module('mean.datalist').directive('datalistfield', [
	'$compile',
	'$filter',
	'$timeout',
	'$upload',
	'DataListAceEditor',
	function($compile, $filter, $timeout,$upload, DataListAceEditor) {
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


			scope.imageUpdate = function() {
				console.warn('imageUpdate() : ');
				console.log(element.find('input[type="file"]')[0].files[0].name);

				scope.$apply(function(scope) {
					$upload.upload({
						url: '/api/upload',
						file: element.find('input[type="file"]')[0].files[0]
					}).progress(scope.uploadProgress).success(scope.uploadSuccess);
				});

			};

            scope.change = function() {
                //scope.$parent.item[scope.item.id] = scope.item[scope.item.id];
                //console.log(scope.$parent.item[scope.field.id]);
                //console.log(scope.item[scope.field.id]);
            };

		    scope.uploadProgress = function (evt) {
		    	var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		       	console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
		    };

		    scope.uploadSuccess = function (data, status, headers, config) {
		    	console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
		    	console.warn(data);
		    	scope.item[scope.field.id] = data.objid + data.extension;
		    	console.warn(scope.item[scope.field.id]);
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




	        if (scope.field.type === 'javascript'){
		        scope.item[scope.field.id] = 'var foo = function(bar){\n\treturn bar;\n};';

			    scope.aceJSLoaded = function(_editor) {
			      DataListAceEditor.create(_editor, 'javascript', function(){
			        scope.item[scope.field.id] = _editor.getValue();
			      });
			    };
			}

	        if (scope.field.type === 'json'){
		        scope.item[scope.field.id] = '{\n\t"id":"idname",\n\t"type": "text",\n\t"required": false,\n\t"label": "Text:"\n}';

			    scope.aceJSONLoaded = function(_editor) {
			      DataListAceEditor.create(_editor, 'json', function(){
			        scope.item[scope.field.id] = _editor.getValue();
			      });
			    };
			}

			if (scope.field.type === 'css'){
		        scope.item[scope.field.id] = '.stylename {\r\tbackground-color : #CCCCCC;\r}';

			    scope.aceCSSLoaded = function(_editor) {
			      DataListAceEditor.create(_editor, 'css', function(){
			        scope.item[scope.field.id] = _editor.getValue();
			      });
			    };
			}

			if (scope.field.type === 'html'){
		        scope.item[scope.field.id] = '<div class="stylename">\n\t{{idname}}\n</div>';

			    scope.aceHTMLLoaded = function(_editor) {
			      DataListAceEditor.create(_editor, 'html', function(){
			        scope.item[scope.field.id] = _editor.getValue();
			      });
			    };
			}
	        

			if (scope.field.type === 'textlist'){
				scope.choices = [{id: 'choice1'}, {id: 'choice2'}, {id: 'choice3'}];

				scope.showAddChoice = function(choice) {
				  	return choice.id === scope.choices[scope.choices.length-1].id;
				};

	        	scope.addNewChoice = function() {
				  	var newItemNo = scope.choices.length+1;
				  	scope.choices.push({'id':'choice'+newItemNo});
				};
			}
        },
		
        template: '<div class="form-group">' +
            '<label mean-token="{{::operation}}-{{::field.id}}" class="col-md-3 control-label">Item {{::field.label}}</label>' +
				'<div class="col-md-9">' +

					// Standard Input field - type="text"
					'<input ng-if="field.type == \'text\'" data-ng-model="item[field.id]" name="{{::field.id}}" type="text" class="form-control" id="{{::field.id}}" placeholder="{{::field.label}}" required>' +
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
					'<input ' +
					'type="file" ' +
					'data-ng-model="item[field.id]" ' +
					'ng-if="field.type == \'image\'" ' + 
					'name="{{::field.id}}" ' +
					'onchange="angular.element(this).scope().imageUpdate()" ' +
					'accept="image/*" />' +

					// Image Upload type="pdf"
					'<input ' +
					'type="file" ' +
					'data-ng-model="item[field.id]" ' +
					'ng-if="field.type == \'pdf\'" ' + 
					'name="{{::field.id}}" ' +
					'onchange="angular.element(this).scope().imageUpdate()" ' +
					'accept="application/pdf" />' +


					// Javascript type="javascript"
					'<div ui-ace="{onLoad: aceJSLoaded}" ' +
					'data-ng-model="item[field.id]" ' +
					'ng-if="field.type == \'javascript\'">' +
					'style="width: 100%;" ' + 
					'id="editor-javascript"></div>' +

					// JSON type="json"
					'<div ui-ace="{onLoad: aceJSONLoaded}" ' +
					'data-ng-model="item[field.id]" ' +
					'ng-if="field.type == \'json\'">' +
					'style="width: 100%;" ' + 
					'id="editor-json"></div>' +

					// JSON type="css"
					'<div ui-ace="{onLoad: aceCSSLoaded}" ' +
					'data-ng-model="item[field.id]" ' +
					'ng-if="field.type == \'css\'">' +
					'style="width: 100%;" ' + 
					'id="editor-css"></div>' +

					// JSON type="json"
					'<div ui-ace="{onLoad: aceHTMLLoaded}" ' +
					'data-ng-model="item[field.id]" ' +
					'ng-if="field.type == \'html\'">' +
					'style="width: 100%;" ' + 
					'id="editor-html"></div>' +

					// Child Input list - type="childlist"
					'<div' + 
					'ng-if="field.type == \'childlist\'">' +
					'<input ng-if="field.type == \'childlist\'" ng-repeat="listitem in field.children track by $index" data-ng-model="item[field.id][$index]" name="{{::field.id}}-{{$index}}" type="text" class="form-control" id="{{::field.id}}-{{$index}}" placeholder="{{::listitem.label}}" required>' +
					'<div>' + 


					// Dynamic Input field list - type="textlist"
					/*
					'<div' + 
					'ng-if="field.type == \'textlist\'">' +
					'<input ng-repeat="listitem in field.children track by $index" data-ng-model="item[field.id][$index]" name="{{::field.id}}-{{$index}}" type="text" class="form-control" id="{{::field.id}}-{{$index}}" placeholder="{{::listitem.label}}" required>' +
					'<div>' + 
					*/
					'<div ng-if="field.type == \'textlist\'">' +
						'<div ng-repeat="choice in choices">' + 
						  '<label for="choice" ng-show="$first">Choices</label>' + 
						  '<button ng-show="$last" ng-click="addNewChoice()">Add another choice</button>' + 
						  '<input type="text" ng-model="choice.name" name="" placeholder="Enter a restaurant name">' + 
						'</div>' + 
					'</div>' + 
				'</div>' +
			'</div>' +
        '</div>'
    };
}]);