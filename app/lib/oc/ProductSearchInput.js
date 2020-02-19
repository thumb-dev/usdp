angular.module('OrderCloud-ProductSearchInput', []);

angular.module('OrderCloud-ProductSearchInput')
    .directive('productsearchinput', productsearchinput)
    .directive('productsearchinputnav', productsearchinputnav)
    .controller('ProductSearchInputCtrl', ProductSearchInputCtrl)
;

function productsearchinput() {
    var directive = {
        restrict: 'E',
        template: searchTemplate,
        controller: 'ProductSearchInputCtrl'
    };
    return directive;

    function searchTemplate() {
        return [
            '<form name="productSearchInput" ng-submit="executeSearch()">',
            '<div class="view-form-icon searchFieldForm">',
            '<div class="input-group searchField" style="margin-top:3%;">',
            '<input type="text" class="form-control searchInput" placeholder="{{\'Search\' | r}} {{\'Products\' | r}}" ng-model="productSearchTerm"/>',
            '<span class="input-group-btn">',
            '<button type="submit" class="btn btn-primary searchButton" ng-disabled="productSearchTerm == null || productSearchTerm == \'\'"><i class="fa fa-search"></i></button>',
            '</span>',
            '</div>',
            '</div>',
            '</form>'
        ].join('');
    }
}

function productsearchinputnav() {
    var directive = {
        restrict: 'E',
        template: searchNavTemplate,
        controller: 'ProductSearchInputCtrl'
    };
    return directive;

    function searchNavTemplate() {
        return [
            '<div class="product-search-display" ng-class="{\'active\':displayProductSearch}">',
            '<div class="row">',
            '<div class="col-xs-10 col-md-11">',
            '<form name="productSearchInput" ng-submit="executeSearch()">',
            '<div class="view-form-icon">',
            '<div class="input-group" style="margin:0 0 10px;">',
            '<input type="text" class="form-control" placeholder="{{\'Search\' | r}} {{\'Products\' | r}}" ng-model="productSearchTerm"/>',
            '<i class="fa fa-search"></i>',
            '<span class="input-group-btn">',
            '<button type="submit" class="btn btn-primary searchButton" ng-disabled="productSearchTerm == null || productSearchTerm == \'\'"><i class="fa fa-search"></i></button>',
            '</span>',
            '</div>',
            '</div>',
            '</form>',
            '</div>',
            '<div class="col-xs-2 col-md-1 text-center">',
            '<i class="fa fa-angle-double-up fa-2x" ng-click="displayProductSearch = false"></i>',
            '</div>',
            '</div>',
            '</div>',
            '<ul class="nav navbar-nav pull-right">',
            '<li class="search-toggle">',
            '<a href ng-click="displayProductSearch = true;">',
            '<i class="fa fa-search"></i>',
            '</a>',
            '</li>',
            '</ul>'
        ].join('');
    }
}

ProductSearchInputCtrl.$inject = ['$scope','$location'];
function ProductSearchInputCtrl($scope, $location) {
    $scope.displayProductSearch = false;
    $scope.executeSearch = function() {
        var searchTerm = $scope.productSearchTerm;
        $scope.productSearchTerm = null;
        $scope.displayProductSearch = false;
        $location.path('search/' + searchTerm);
    };
}
