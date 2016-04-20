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
            console.log("Res", order)
            $scope.pendingOrders.push(order);
            $scope.thing = {};
          })
        } else if($scope.user.userType === "Admin") {
          BuyersService.createOrderAdmin(order, $routeParams.id)
          .then(function(res) {
            $scope.pendingOrders.push(order);
            $scope.thing = {};
          })
        }
    }
    
    if($scope.user.userType === 'Buyer') {
      BuyersService.getOrdersPending(true).then(function(data) {
          $scope.pendingOrders = data.data;
      })
      BuyersService.getOrdersPending(false).then(function(data) {
          $scope.notPendingOrders = data.data;
      })
    } else if($scope.user.userType === "Admin"){
      BuyersService.getOrdersPendingByAdmin($routeParams.id)
        .then(function(data) {
          $scope.pendingOrders = data.data.filter(function(order) {
            return order.pendingApproval === true;
          })
          $scope.notPendingOrders = data.data.filter(function(order) {
            return order.pendingApproval === false;
          })
        })
    };
}
