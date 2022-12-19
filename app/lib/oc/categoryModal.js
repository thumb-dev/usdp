angular.module('OrderCloud-CategoryModal', []);

angular.module('OrderCloud-CategoryModal')
  .directive('categorymodal', categorymodal)
  .controller('CategoryModalCtrl', CategoryModalCtrl);

function categorymodal() {
  var directive = {
    restrict: 'E',
    template: template,
    controller: 'CategoryModalCtrl'
  };
  return directive;

  function template() {
    return [
      '<style>',
      //this style is conditional based on nav placement and site css
      //'categorymodal a, categorymodal a:hover, categorymodal a:focus {color:#fff; text-decoration:none;}',
      '</style>',
      // update the size of the modal window within the open()
      '<a ng-click="openCategory(500)">',
      // update fontawesome for the shopping bag icon
      '<i class="fa fa-shopping-bag"></i>',
      '<span class="hidden-xs">{{\'Never see this popup again\' | r | xlat}}</span>',
      '</a>'
    ].join('');
  }
}

CategoryModalCtrl.$inject = ['$scope', '$modal', '$log', 'User', '$timeout'];

function CategoryModalCtrl($scope, $modal, $log, User, $timeout) {

  $scope.animationsEnabled = true;

  $scope.openCategory = function(size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      backdrop: true,
      backdropClick: true,
      dialogFade: false,
      keyboard: true,
      size: size,
      template: categorymodalopen,
      controller: CategoryModalOpenCtrl,
      resolve: {
        theuser: function() {
          //pass a scope variable into the modal content. in this case we are providing the category tree
          return $scope.user;
        }
      }
    });

    function categorymodalopen() {
      return [
        '<style>',
        '.modal-header {min-height: 36px; padding: 2px;border-bottom: 1px solid #e5e5e5;}',
        '.modal-header h3 { margin-top:0;}',
        '.modal-header h5 { font-size:1.16em; font-weight:bold; padding:5px 10px; text-shadow: 0 1px 0 #ffffff;}',
        '.modal-header a.close {margin:0;padding:0;position:absolute;top:8px;right:10px;font-size:1.5em;color:#000;}',
        '.modal-body {width:100%; margin:0 auto; padding:10px 25px;}',
        '</style>',
        '<div class="modal-header" style="padding:0;">',
        //Optional title in top header
        '<img src="https://thumbprint.com/four51_images/Our-offices-will-be-closed-December-24th-January-2nd_v1.png" alt="Happy Holidays" style="width: 100%;border-top-left-radius: 6px;border-top-right-radius: 6px;">',
        // '<h5 class="modal-title text-primary">Happy Holidays from all of us at Thumbprint!</i></h5>',
        //Optional close (x) in top header
        '<a class="pull-right close" ng-click="close()" style="top: 2px;">',
        '<i class="fa fa-times"></i>',
        '</a>',
        '</div>',
        '<div class="modal-body" style="padding-top: 25px;">',
        // '<h3>Heading</h3>',
        // content block 1
        //'<h4>Subheading</h4>',
        '<p>',
        'Happy Holidays from all of us at Thumbprint!',
        '</p>',
        '<p>',
        'A reminder that our office will be closed from December 24, 2022 to January 2nd, 2023, to give our hard working team a well-deserved break to enjoy the holidays.',
        '</p>',
        '<p>',
        'Any orders placed during that time will not be processed until January 2nd. If you have an urgent matter that Santa can\'t solve, email us at <a href="mailto:hello@thumbprint.com"><strong>hello@thumbprint.com</strong></a>',
        '</p>',
        '<p>',
        'All orders <strong>placed before 1 PM ET on December 23rd</strong> will be processed as normal.',
        '</p>',
        '<p>',
        'On behalf of the entire Thumbprint team, we\'d like to extend our warmest wishes for a wonderful Holiday Season and a Happy New Year!',
        '</p>',
        //content block 2
        // '<p>',
        // '<div ng-repeat="field in user.CustomFields | filter:{Name:\'ADMI_Popup\'}">',
        //   '<occheckboxfield id="update-password-field" customfield="field" ng-if="field.ControlType == \'Selection\'" ng-required="field.IsRequired" label=\'Check box to never see this pop-up again\' checked=\'Yes\' unchecked=\'No\'/>',
        // '</div>',
        // '</p>',
        // <occheckboxfield customfield='Variant.Specs.Approved' label='Custom' checked='Yes' unchecked='No'></occheckboxfield>
        //'<h4>Subheading</h4>',
        '</div>',
        //Optional footer
        '<div class="modal-footer">',
        '<div class="pull-left">',
        // '<a class="btn btn-default" ng-click="cancel()">Cancel</a>',
        // '<div ng-repeat="field in user.CustomFields | filter:{Name:\'Chewy_Popup\'}">',
        // '<occheckboxfield id="update-password-field" customfield="field" ng-if="field.ControlType == \'Selection\'" ng-required="field.IsRequired" label=\'Check box to never see this pop-up again\' checked=\'Yes\' unchecked=\'No\'/>',
        // '</div>',
        '</div>',
        '<div class="pull-right">',
        '<a target="_blank" class="btn btn-info" ng-click="close()">Close</a>',
        '</div>',
        '</div>'
      ].join('');
    }

    modalInstance.result.then(function(currentCategory) {
      $scope.current = currentCategory;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });

    $scope.toggleAnimation = function() {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };
  };

  var CategoryModalOpenCtrl = ['$scope', '$location', '$modalInstance', '$modal', 'theuser', 'User', function($scope, $location, $modalInstance, $modal, theuser, User) {



    $scope.save = function() {
      $scope.actionMessage = null;
      $scope.securityWarning = false;
      $scope.displayLoadingIndicator = true;

      User.save($scope.user,
        function(u) {
          $scope.securityWarning = false;
          $scope.displayLoadingIndicator = false;
          $scope.actionMessage = 'Your changes have been saved';
        },
      );
    };

    // this is the item passed in from the CategoryModalCtrl resolve
    $scope.user = theuser;

    $scope.close = function() {
      $modalInstance.close();
      // $scope.save();
      // console.log('checkbox value', $scope.user.CustomFields[0].Value);
    };

    $scope.retarget = function(url) {
      $scope.target = url;
      $location.path($scope.target);
      $modalInstance.close();
    };

    $scope.closeCategory = function() {
      $modalInstance.close();
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

  }];
        setTimeout(function() {
            $scope.openCategory(500);
        }, 500);

  }
