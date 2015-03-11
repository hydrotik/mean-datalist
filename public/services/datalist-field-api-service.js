'use strict';

angular.module('mean.datalist').factory('DataListModel', function() {

	var fields = [
      {
        id : 'title',
        label : 'Title',
        type : 'text',
        showinlist : true,
        listview : '<a href="/#!/datalist/{{item._id}}">{{item[field.id]}}</a>',
        detailview : ''
      },
      {
        id : 'launchdate',
        label : 'Launch Date',
        type : 'date',
        showinlist : true,
        listview : '<a href="/#!/datalist/{{item._id}}">{{item[field.id] | date:"dd-MMMM-yyyy"}}</a>',
        detailview : ''
      },
      {
        id : 'content',
        label : 'Content',
        type : 'textarea',
        showinlist : false,
        listview : '<a href="/#!/datalist/{{item._id}}">{{item[field.id]}}</a>',
        detailview : ''
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
            value : 'female',
            selected : true
          }
        ],
        showinlist : true,
        listview : '<a href="/#!/datalist/{{item._id}}">{{item[field.id]}}</a>',
        detailview : ''
      },
      {
        id : 'subscribe',
        label : 'Subscribe',
        type : 'checkbox',
        options : {
            'true' : 'Yes',
            'false' : 'No'
        },
        selected : true,
        showinlist : true,
        listview : '<a href="/#!/datalist/{{item._id}}">{{item[field.id]}}</a>',
        detailview : ''
      },
      {
        id : 'picture',
        label : 'Profile Image',
        type : 'image',
        showinlist : false,
        listview : '<a href="/#!/datalist/{{item._id}}">{{item[field.id]}}</a>',
        detailview : ''
      },
      {
        id : 'pdf',
        label : 'PDF File',
        type : 'pdf',
        showinlist : false,
        listview : '<a href="/#!/datalist/{{item._id}}">{{item[field.id]}}</a>',
        detailview : ''
      },
      {
        id : 'json',
        label : 'JSON',
        type : 'json',
        showinlist : false,
        listview : '<a href="/#!/datalist/{{item._id}}">{{item[field.id]}}</a>',
        detailview : ''
      },
      {
        id : 'js',
        label : 'Javascript',
        type : 'javascript',
        showinlist : false,
        listview : '<a href="/#!/datalist/{{item._id}}">{{item[field.id]}}</a>',
        detailview : ''
      },
      {
        id : 'css',
        label : 'CSS',
        type : 'css',
        showinlist : false,
        listview : '<a href="/#!/datalist/{{item._id}}">{{item[field.id]}}</a>',
        detailview : ''
      },
      {
        id : 'html',
        label : 'HTML',
        type : 'html',
        showinlist : false,
        listview : '<a href="/#!/datalist/{{item._id}}">{{item[field.id]}}</a>',
        detailview : ''
      },
      {
        id : 'nested',
        label : 'Address',
        type : 'childlist',
        children : [
          {
            label : 'Address 1'
          },
          {
            label : 'Address 2'
          }
        ],
        showinlist : true,
        listview : '<a href="/#!/datalist/{{item._id}}">{{item[field.id]}}</a>',
        detailview : ''
      },

      // http://mrngoitall.net/blog/2013/10/02/adding-form-fields-dynamically-in-angularjs/
      {
        id : 'links',
        label : 'Links',
        type : 'textlist',
        children : [
        ],
        showinlist : true,
        listview : '<a href="/#!/datalist/{{item._id}}">{{item[field.id]}}</a>',
        detailview : ''
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

