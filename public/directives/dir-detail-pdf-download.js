'use strict';


angular.module('mean.datalist').directive('pdfDirectDownload', [
    'DataListTree',
    function(DataListTree) {
        return {
            restrict: 'E',
            scope: {
                src : '@data'
            },
            link: function(scope, element, attr) {
                element.replaceWith('<a href="" class="btn btn-primary" ng-click="downloadPdf()">Download</a>');

                var anchor = element.children()[0];

                var $ = window.$;

                

                // When the download starts, disable the link
                scope.$on('download-start', function() {
                    $(anchor).attr('disabled', 'disabled');
                });

                // When the download finishes, attach the data to the link. Enable the link and change its appearance.
                scope.$on('downloaded', function(event, data) {
                    $(anchor).attr({
                        href: 'data:application/pdf;base64,' + data,
                        download: attr.filename
                    })
                        .removeAttr('disabled')
                        .text('Save')
                        .removeClass('btn-primary')
                        .addClass('btn-success');

                    // Also overwrite the download pdf function to do nothing.
                    scope.downloadPdf = function() {};
                });
            },
            controller: ['$scope', '$attrs', '$http',
                function($scope, $attrs, $http) {
                    $scope.downloadPdf = function() {
                        $scope.$emit('download-start');
                        /*
                        $http.get($scope.src).then(function(response) {
                            //$scope.$emit('downloaded', response.data);

                        });
                        */

                        var file = $scope.src.toLowerCase().split('/').pop();
                        console.log(file);
                        /*
                        DataListTree.fetchFile(file, true).then(function(data) {
                            $scope.$emit('downloaded', data);
                        });
                        */
                        $scope.$emit('downloaded', {});
                    };
                }
            ]
        };
    }]
);