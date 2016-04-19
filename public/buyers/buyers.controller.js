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
        console.log("PRDS", data.data);
        console.log("GROUB", _.groupBy(data.data, 'category'));
        var cats = Object.keys(_.groupBy(data.data, 'category'))
        console.log(cats);
    })
    BuyersService.getAllCategories().then(function(data) {
        $scope.categories = data.data;
    })
    $scope.createOrder = function(order) {
        console.log($scope.myProducts);
        order.category = order.category;
        order.quantityOrdered = order.quantityOrdered;
        order.inventory = $scope.myProducts[0];

        if($scope.user.userType === 'Buyer') {
          BuyersService.createOrder(order)
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
        console.log("ARE PENDING", data.data);
        $scope.pendingOrders = data.data;
    })
    BuyersService.getOrdersPending(false).then(function(data) {
        console.log("HELLO", data.data);
        $scope.notPendingOrders = data.data;
    })
}
