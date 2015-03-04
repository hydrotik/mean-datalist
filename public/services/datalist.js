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
        id : 'startdate',
        label : 'Start Date',
        type : 'date'
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
        id : 'description',
        label : 'Content Again',
        type : 'textarea'
      },
      {
        id : 'superhero',
        label : 'Superhero',
        type : 'text'
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