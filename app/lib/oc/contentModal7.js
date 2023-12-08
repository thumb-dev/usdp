angular.module('OrderCloud-ContentModal7', []); 

angular.module('OrderCloud-ContentModal7')
    .directive('contentmodal7', contentmodal7)
    .controller('ContentModalCtrl7', ContentModalCtrl7)
;

function contentmodal7() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'ContentModalCtrl7'
    };
    return directive;

    function template() {
        return [
            '<style>',
            //this style is conditional based on nav placement and site css
            'contentmodal a, contentmodal a:hover, contentmodal a:focus {color:#fff; text-decoration:none;}',
            '</style>',
            // update the size of the modal window within the open()
            '<a ng-click="open7(500)" style="text-decoration: none;">',
            // replace the *Open Modal* below with your link name
            '<span class="modalName PDT-modalName"></span> {{\'Open\' | r | xlat}}',
            '</a>'
        ].join('');
    }
}

ContentModalCtrl7.$inject = ['$scope', '$modal'];
function ContentModalCtrl7($scope, $modal) {

    $scope.animationsEnabled = true;

    $scope.open7 = function (size) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            size: size,
            template: contentmodal7open,
            controller: ContentModalOpenCtrl7,
            resolve: {
                item: function () {
                    //pass a scope variable into the modal content. in this case we are providing line item as an example for product use
                    return $scope.LineItem;
                }
            }
        });

        function contentmodal7open() {
            return [
               '<style>',
                '.modal-header {min-height: 36px; padding: 2px;}',
                '.modal-header h3 { margin-top:0;}',
                '.modal-header h5 { font-size:1.16em; font-weight:bold; padding:5px 10px; text-shadow: 0 1px 0 #ffffff;}',
                '.modal-header a.close {margin:0;padding:0;position:absolute;top:8px;right:10px;font-size:1.5em;color:#000;}',
                '.modal-body {width:100%; margin:0 auto; padding:10px 25px;}',
                '</style>',
                '<div class="modal-header" style="border-bottom: 1px solid #e5e5e5;margin-bottom: 20px;">',
                //Optional title in top header
                '<h5 class="modal-title text-primary" style="text-align:center">Important Holiday Message from your team at Thumbprint</h5>',
                //Optional close (x) in top header
                '<a class="pull-right close" ng-click="close()">',
                '<i class="fa fa-times"></i>',
                '</a>',
                '</div>',
                '<div class="modal-body">',
                // '<h3>Heading</h3>',
                //content block 1
                // '<h4>Subheading</h4>',
                '<p>',
                'To let our team enjoy the holiday season, Thumbprint will be closed on <strong>Monday, December 25th, 2023 thru Monday, January 1st, 2024</strong>.<br/><br/>All orders placed during that time will be processed beginning Tuesday, January 2nd. We wish you a Happy Holidays and New Year!',
                '</p>',
                //content block 2
                //'<h4>Subheading</h4>',
                '</div>',
                //Optional footer
                '<div class="modal-footer">',
                // '<div class="pull-left">',
                // '<a class="btn btn-default" ng-click="cancel()">Cancel</a>',
                // '</div>',
                '<div class="pull-right">',
                '<a target="_blank" class="btn btn-primary " ng-click="close()">Close</a>',
                '</div>',
                '</div>'
            ].join('');
        }

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

    };

    var ContentModalOpenCtrl7 = ['$scope', '$modalInstance', '$modal', 'item', function($scope, $modalInstance, $modal, item) {

        $scope.item = item; // this is the item passed in from the ContentModalCtrl7 resolve

        $scope.close = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }];
$scope.open7(500);
}
