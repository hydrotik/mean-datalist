'use strict';


angular.module('mean.datalist').directive('pdfDirectDownload', [
    'DataListTree',
    '$timeout',
    '$http',
    function(DataListTree, $timeout, $http) {
        return {
            restrict: 'AE',

            scope: {
                src : '@data'
            },

            template : '<a href="" class="btn btn-primary" ng-click="downloadPdf()">Download</a>',

            link: function(scope, element, attr) {

                var $ = window.$;

                $timeout(function() {
                    var anchor = element.children()[0];

                    console.log(anchor);
                    console.log(element);
                    console.log(element.children());


                    

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

                    scope.downloadPdf = function() {
                            console.log('DOWNLOAD');
                            scope.$emit('download-start');

                            var file = scope.src.toLowerCase().split('/').pop();

                            console.log(file);
                            
                            $http.get(scope.src).then(function(response) {
                                scope.$emit('downloaded', response.data);

                            });
                            

                            
                            
                            /*
                            DataListTree.fetchFile(file, true).then(function(data) {
                                $scope.$emit('downloaded', data);
                            });
                            */
                            //scope.$emit('downloaded', {});
                    };
                }, 0);
            }
        };
    }]
);