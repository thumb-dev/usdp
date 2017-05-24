four51.app.controller('NavCtrl', ['$location', '$route', '$scope', '$451', 'User',
    function ($location, $route, $scope, $451, User) {
        $scope.Logout = function(){
            User.logout();
            if ($scope.isAnon) {
                $location.path("/catalog");
                User.login(function(user) {
                    $scope.user = user;
                });
            }
        };

        $scope.Clear = function() {
            localStorage.clear();
        }

        $scope.$on('event:orderUpdate', function(event, order) {
            $scope.cartCount = (order ? ((order.Status == 'Unsubmitted') ? order.LineItems.length : null) : null);
        });
    }]);