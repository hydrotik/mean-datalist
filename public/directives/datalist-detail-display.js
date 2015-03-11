'use strict';


angular.module('mean.datalist').directive('datalistdetail', [
    '$compile',
    '$filter',
    '$timeout',
    function($compile, $filter, $timeout) {
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
                field : '=ngModel',
                item : '=dlModel'
            },

            link: function(scope, element, attrs, $parse) {

            },
            
            template: '<div>' +

                        // Standard Input field - type="text"
                        '<h2 ng-if="field.id == \'title\'">{{item.title}}</h2>' + 
                        
                        // TextArea Input field - type="textarea"
                        '<p ng-if="field.id == \'content\'">{{item[field.id]}}</p>' +

                        // Datepicker Input field - type="date"
                        '<p ng-if="field.id == \'launchdate\'">{{item[field.id] | date:\"dd-MMMM-yyyy\"}}</p>' +

                        // Radio Button Group type="radio"
                        '<p ng-if="field.id == \'gender\'">{{item[field.id]}}</p>' +

                        // Checkbox type="checkbox"
                        '<p ng-if="field.id == \'subscribe\'">{{item[field.id]}}</p>' +

                        // Image Upload type="image"
                        '<img ng-if="field.id == \'picture\'" ng-src="./packages/custom/datalist/public/upload/{{item[field.id]}}" />' +

                        // Image Upload type="pdf"
                        '<a ng-if="field.type == \'pdf\' && field.showinlist" href="/#!/datalist/{{item._id}}">{{item[field.id]}}</a>' +

                        // Javascript type="javascript"
                        '<a ng-if="field.type == \'javascript\' && field.showinlist" href="/#!/datalist/{{item._id}}">{{item[field.id]}}</a>' +

                        // JSON type="json"
                        '<a ng-if="field.type == \'json\' && field.showinlist" href="/#!/datalist/{{item._id}}">{{item[field.id]}}</a>' +

                        // JSON type="css"
                        '<a ng-if="field.type == \'css\' && field.showinlist" href="/#!/datalist/{{item._id}}">{{item[field.id]}}</a>' +

                        // JSON type="json"
                        '<a ng-if="field.type == \'json\' && field.showinlist" href="/#!/datalist/{{item._id}}">{{item[field.id]}}</a>' +

                        // Child Input list - type="childlist"
                        '<div ng-if="field.type == \'childlist\' && field.showinlist">' +
                            '<div ng-repeat="listitem in field.children track by $index" href="/#!/datalist/{{item._id}}">{{item[field.id][$index]}}</div>' +
                        '<div>' +

                        // Dynamic Input field list - type="textlist"
                        '<a ng-if="field.type == \'textlist\' && field.showinlist" href="/#!/datalist/{{item._id}}">{{item[field.id]}}</a>' +
            '</div>'
        };
    }
]);