'use strict';

// http://onehungrymind.com/angularjs-dynamic-templates/


angular.module('mean.datalist').directive('datalistdisplay', [
    '$compile',
    '$filter',
    '$timeout',
    'DataListModel',
    function($compile, $filter, $timeout, DataListModel) {






        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
                var i = parseInt(scope.index);
                var viewtype = scope.viewtype;
                var fields = DataListModel.getFields();
                var template = fields[i][viewtype];

                console.log(i + ': ' + fields[i].id);
                console.log(template);

                element.html(template).show();
                $compile(element.contents())(scope);
            },
            scope: {
                index:'@',
                viewtype:'@',
                item:'@',
                field:'@'
            }
        };
    }
]);