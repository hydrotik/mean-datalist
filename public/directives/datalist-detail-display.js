'use strict';


angular.module('mean.datalist').directive('datalistdetail', [
    '$compile',
    '$filter',
    '$timeout',
    '$sce',
    function($compile, $filter, $timeout, $sce) {
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

                if(scope.field.type === 'html' || scope.field.type === 'htmleditor'){
                    $timeout(function() {
                        scope.safeHTML = $sce.trustAsHtml(scope.item[scope.field.id]);
                    }, 0);
                }

                if(scope.field.type === 'javascript'){
                    $timeout(function() {
                        scope.safeJS = $sce.trustAsJs(scope.item[scope.field.id]);
                    }, 0);
                }

                if(scope.field.type === 'image'){
                    $timeout(function() {
                        scope.picture = '/packages/custom/datalist/public/assets/uploads/' + scope.item[scope.field.id];
                    }, 0);
                }

                scope.$watch(function() {
                    return attrs.ngSrc;
                }, function(value) {
                    if (!value) {
                        element.attr('src', attrs.errSrc);
                    }
                });

                element.bind('error', function() {
                    element.attr('src', '/packages/custom/datalist/public/assets/uploads/' + scope.item[scope.field.id]);
                });
            },
            
            template: 
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

                        // Image Upload type="image" FIXME
                        '<img ng-if="field.id == \'picture\'" err-src src="http://google.com/favicon.ico" ng-src="{{picture}}" />' +

                        // Image Upload type="pdf"
                        '<a ng-if="field.id == \'pdf\'" href="/#!/datalist/{{item._id}}" target="_blank">{{item[field.id]}}</a>' +

                        // Javascript type="javascript" FIXME
                        '<script type="text/javascript" ng-if="field.id == \'js\'" ng-bind-js="safeJS"></script>' +

                        // JSON type="json" FIXME
                        //'<script type="text/javascript" ng-if="field.id == \'json\'" ng-bind-js="\'var foo = \' + safeJS + \';\'"></script>' +

                        // CSS type="css"
                        '<style ng-if="field.id == \'css\'">{{item[field.id]}}</style>' +

                        // HTML type="html"
                        '<div ng-if="field.id == \'html\' || field.id ==\'htmleditor\'" ng-bind-html="safeHTML"></div>' +

                        // Child Input list - type="childlist"
                        '<div ng-if="field.id == \'nested\'">' +
                            '<div ng-repeat="listitem in field.children track by $index" href="/#!/datalist/{{item._id}}">{{item[field.id][$index]}}</div>' +
                        '<div>' +

                        // Dynamic Input field list - type="textlist"
                        '<a ng-if="field.type == \'links\'" href="/#!/datalist/{{item._id}}">{{item[field.id]}}</a>'
        };
    }
]);