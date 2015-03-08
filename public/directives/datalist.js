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
	function($compile, $filter, $timeout,$upload) {
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
        	//console.warn($upload);
        	/*
        	element.find('input[type="file"]').bind('change', function (changeEvent) {
        		if(scope.field.type === 'file'){
	                var reader = new FileReader();
	                console.log(changeEvent.target);
	                reader.onload = function (loadEvent) {
	                    scope.$apply(function () {
	                        scope.fileread = loadEvent.target.result;
	                    });
	                };
	                //reader.readAsDataURL(changeEvent.target.files[0]);
	            }
            });
*/
        	/*
        	$timeout(function() {
        		scope[scope.item.id] = scope.$parent.$parent[scope.item.id];
				console.log(scope[scope.item.id]);
          	}, 100);
        	
			*/

			scope.imageUpdate = function() {
				console.warn('imageUpdate() : ');
				console.log(element.find('input[type="file"]')[0].files[0].name);
				//var exp = $parse(attrs.dlModel);

				//console.log(exp);
				//console.log(element.files[0]);
				// http://stackoverflow.com/questions/16631702/file-pick-with-angular-js
				
				scope.$apply(function(scope) {
					/*
			         var photofile = element.find('input[type="file"]')[0].files[0];

			         scope.$parent.item[scope.item.id] = photofile.name;

			         var reader = new FileReader();
			         reader.onload = function(e) {
			            //scope[scope.item.id] = e.target.result;
			            
			         };
			         reader.readAsDataURL(photofile);
*/
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
            /*
            scope.$watch('files', function () {
            	console.warn(scope.files);
		    });
				
            
		    scope.upload = function (files) {
		        if (files && files.length) {
		            for (var i = 0; i < files.length; i+=1) {
		                var file = files[i];
		                $upload.upload({
		                    url: 'upload/url',
		                    file: file
		                }).progress(scope.uploadProgress).success(scope.uploadSuccess);
		            }
		        }
		    };
			*/
		    scope.uploadProgress = function (evt) {
		    	var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		       	console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
		    };

		    scope.uploadSuccess = function (data, status, headers, config) {
		    	console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
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

					// http://stackoverflow.com/questions/24968194/ng-flow-issuing-a-get-but-not-a-post
					// http://stackoverflow.com/questions/23449065/reassemble-binary-after-flow-js-upload-on-node-express-server
					// https://raw.githubusercontent.com/raam86/secret-octo-ly/master/hacked
					// https://github.com/flowjs/flow.js/blob/master/samples/Node.js/app.js#L1
					// https://github.com/flowjs/ng-flow/issues/62
					/*
				    '<div flow-init="{}" flow-prevent-drop ' + 
                     'flow-drag-enter="style={border: \'5px solid green\'}" ' + 
                     'flow-drag-leave="style={}" ' + 
                     'ng-style="style" ' + 

                     'flow-files-submitted="$flow.upload()" ' + 
                     'flow-file-success="$file.msg = $message" ' +
                     'ng-if="field.type == \'image\'">' + 

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
					*/


					'<input ' +
					'type="file" ' +
					'data-ng-model="item[field.id]" ' +
					'ng-if="field.type == \'image\'" ' + 
					'name="fileupload" ' +
					'onchange="angular.element(this).scope().imageUpdate()" ' +
					'accept="image/*" />' +

					/*
					'<div class="button btn btn-info" ' +
					'ng-if="field.type == \'image\'" ' + 
					'ng-file-select ' +
					'ng-file-change="upload($files)">' +
					'Upload on file change' +
					'</div>' +
					*/
				'</div>' +
			'</div>' +
        '</div>'
    };
}]);