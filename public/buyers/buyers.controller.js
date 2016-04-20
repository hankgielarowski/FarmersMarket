angular.module("buyers.module").controller("BuyersController", BuyersController);
BuyersController.$inject = ["$scope", "$http", "$location", "$q", "$rootScope", "BuyersService", "AuthService", "_", "$routeParams"];

function BuyersController($scope, $http, $location, $q, $rootScope, BuyersService, AuthService, _, $routeParams) {
    $scope.user = AuthService.currentUser();
    $scope.pendingOrders = [];
    $scope.myProducts;
    $scope.showThisCat = function(category) {
            $scope.showCat = category;
        }
        // on image
    BuyersService.getAllInventoryByCategory().then(function(data) {
        $scope.myProducts = data.data;
        var cats = Object.keys(_.groupBy(data.data, 'category'))
    })
    BuyersService.getAllCategories().then(function(data) {
        $scope.categories = data.data;
    })

    $scope.createOrder = function(product, id) {
        var order = {};
        order.category = product.category;
        order.name = product.name;
        order.price= product.price;
        order.quantityOrdered = product.quantityOrdered;
        order.inventory = product;

        if($scope.user.userType === 'Buyer') {
          BuyersService.createOrder(order, id)
          .then(function(res){
            $scope.pendingOrders.push(order);
            $scope.thing = {};
          })
        } else {
          BuyersService.createOrderAdmin(order,$routeParams.id)
          .then(function(res) {
            $scope.pendingOrders.push(order);
            $scope.thing = {};
          })
        }
    }
    BuyersService.getOrdersPending(true).then(function(data) {
        $scope.pendingOrders = data.data;
    })
    BuyersService.getOrdersPending(false).then(function(data) {
        $scope.notPendingOrders = data.data;
    })
}
