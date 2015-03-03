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

    /*
    function find(collection, query) {
    	var i;
        for (var key in query) {
            if (query.hasOwnProperty(key)) {
                if (isArray(collection)) {
                    for (i = 0; i < collection.length; i += 1) {
                        if (collection[i][key] === query[key]) return collection[i];
                    }
                }else{
                	console.error('XcollectionsQuery.find() : Implement Object Logic');
                	for (i in collection){
                		if (collection[i][key] === query[key]) return collection[i];
                	}
                }

            }
        }
    }

    

    function findAndDelete(collection, query) {
    	var i, delta, filter = function (el) {
			return el[key] !== query[key];
		};
        for (var key in query) {
            if (query.hasOwnProperty(key)) {
                if (isArray(collection)) {
                    delta = collection.filter(filter);
                }else{
                	console.error('XcollectionsQuery.findAndDelete() : Implement Object Logic');
                	for (i in collection){
                		if (collection[i][key] === query[key]) return collection[i];
                	}
                }
            }
        }
        return delta;
    }



    function isArray(array){
        if( Object.prototype.toString.call( array ) === '[object Array]' ) {
		    return true;
		}
		return false;
    }
	*/

	
    // expose a public API
    return {
        getFields : getFields,
        clearFieldModels : clearFieldModels,
        getData : getData,
        setScope : setScope
    };
});