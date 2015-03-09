'use strict';

//DataList service used for datalist REST endpoint
angular.module('mean.datalist').factory('DataList', ['$resource',
  function($resource) {
    return $resource('datalist/:itemid', {
      itemid: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);




angular.module('mean.datalist').factory('DataListModel', function() {

	var fields = [
      {
        id : 'title',
        label : 'Title',
        type : 'text'
      },
      {
        id : 'launchdate',
        label : 'Launch Date',
        type : 'date'
      },
      {
        id : 'content',
        label : 'Content',
        type : 'textarea'
      },
      {
        id : 'gender',
        label : 'Gender',
        type : 'radio',
        children : [
          {
            label : 'Male',
            value : 'male'
          },
          {
            label : 'Female',
            value : 'female'
          }
        ]
      },
      {
        id : 'subscribe',
        label : 'Subscribe',
        type : 'checkbox',
        options : {
            'true' : 'Yes',
            'false' : 'No'
        },
        selected : true
      },
      {
        id : 'picture',
        label : 'Profile Image',
        type : 'image'
      },
      {
        id : 'json',
        label : 'JSON',
        type : 'json'
      },
      {
        id : 'js',
        label : 'Javascript',
        type : 'javascript'
      },
      {
        id : 'css',
        label : 'CSS',
        type : 'css'
      },
      {
        id : 'html',
        label : 'HTML',
        type : 'html'
      }
    ];

    function getFields() {
    	return fields;
    }

    function clearFieldModels(scope){
      for (var i = 0; i < fields.length; i+=1) {
        scope[fields[i].id] = '';
      }
    }

    function setScope(scope, data){
      for (var i = 0; i < fields.length; i+=1) {
        scope[fields[i].id] = data[fields[i].id];
      }
    }

    function getData(scope){
    	var data = {};
      for (var i = 0; i < fields.length; i+=1) {
        console.log(fields[i].id + ': ' + scope[fields[i].id]);
        data[fields[i].id] = scope[fields[i].id];
      }
      return data;
    }


    // expose a public API
    return {
        getFields : getFields,
        clearFieldModels : clearFieldModels,
        getData : getData,
        setScope : setScope
    };
});




angular.module('mean.datalist').factory('DataListAceEditor', function() {

    window.define = window.ace.define;

    function create(_editor, mode, callback){
      window.ace.require('ace/ext/language_tools');

      _editor.setTheme('ace/theme/twilight');
      _editor.getSession().setMode('ace/mode/' + mode);

      _editor.getSession().on('change', callback);

      _editor.setOptions({
        showGutter: true,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
      });
    }


    // expose a public API
    return {
        create : create
    };
});