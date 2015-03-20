'use strict';


angular.module('mean.datalist').directive('pdf', [
	'$timeout',
	function($timeout) {
	    return {
        restrict: 'E',
        scope : {
        	src : '@data'
        },
        link: function(scope, element, attrs) {
        	$timeout(function() {
        		var url = scope.src;
            	console.log(url);
            	element.replaceWith('<object type="application/pdf" data="' + url + '"></object>');
			}, 0);
            
        }
    };
	}
]);