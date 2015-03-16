'use strict';


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

	        	// Upload functionality for Image, PDF, etc.
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

				if (scope.field.type === 'dynamictextlist'){
					$timeout(function() {
						scope.field.children.push({id: 'option1'});

						scope.showAddChoice = function(option) {
						  	return option.id === scope.field.children[scope.field.children.length-1].id;
						};

			        	scope.addNewChoice = function() {
						  	var newItemNo = scope.field.children.length+1;
						  	scope.field.children.push({'id':'option'+newItemNo});
						};
                    }, 0);
					
				}
		        
	        },



			
	        template: '<div class="form-group">' +
	            '<label mean-token="{{::operation}}-{{::field.id}}" class="col-md-3 control-label">Item {{::field.label}}</label>' +
					'<div class="col-md-9">' +

						// Standard Input field - type="text" | public/directives/datalist-input-text.js
						'<datalist-input-text ng-if="field.type == \'text\'"></datalist-input-text>' + 

						// TextArea Input field - type="textarea" | public/directives/datalist-input-textarea.js
						'<datalist-input-textarea ng-if="field.type == \'textarea\'"></datalist-input-textarea>' + 

						// Datepicker Input field - type="date" | public/directives/datalist-input-date.js
					    '<datalist-input-date ng-if="field.type == \'date\'"></datalist-input-date>' + 

					    // Radio Button Group type="radio" | public/directives/datalist-input-radio.js
						'<datalist-input-radio ng-if="field.type == \'radio\'"></datalist-input-radio>' + 

					    // Checkbox type="checkbox" | public/directives/datalist-input-checkbox.js
						'<datalist-input-checkbox ng-if="field.type == \'checkbox\'"></datalist-input-checkbox>' +

						// Image Upload type="image" | public/directives/datalist-input-image.js
						'<datalist-input-image ng-if="field.type == \'image\'" ></datalist-input-image>' + 

						// Image Upload type="pdf" | public/directives/datalist-input-pdf.js
						'<datalist-input-pdf ng-if="field.type == \'pdf\'" ></datalist-input-pdf>' + 

						// Javascript type="javascript" | public/directives/datalist-input-javascript.js
						'<datalist-input-javascript ng-if="field.type == \'javascript\'" ></datalist-input-javascript>' + 

						// JSON type="json" | public/directives/datalist-input-json.js
						'<datalist-input-json ng-if="field.type == \'json\'" ></datalist-input-json>' + 

						// JSON type="css" | public/directives/datalist-input-css.js
						'<datalist-input-css ng-if="field.type == \'css\'" ></datalist-input-css>' + 

						// HTML type="html" | public/directives/datalist-input-html.js
						'<datalist-input-html ng-if="field.type == \'html\'" ></datalist-input-html>' + 

						// HTML type="htmleditor" | public/directives/datalist-input-htmleditor.js
						'<datalist-input-htmleditor ng-if="field.type == \'htmleditor\'" ></datalist-input-htmleditor>' + 

						// Child Input list - type="textlist" | public/directives/datalist-input-textlist.js
						'<datalist-input-textlist ng-if="field.type == \'textlist\'" ></datalist-input-textlist>' + 

						// Dynamic Input field list - type="dynamictextlist" | public/directives/datalist-input-dynamictextlist.js
						'<datalist-input-dynamictextlist ng-if="field.type == \'dynamictextlist\'" ></datalist-input-dynamictextlist>' + 
					'</div>' +
				'</div>' +
	        '</div>'
	    };
	}
]);