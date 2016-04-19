  angular
.module("farmers.module")
.controller("FarmersController", FarmersController);

FarmersController.$inject = ["$scope", "$http", "$location", "$q", "$rootScope", "FarmersService", "AuthService","BuyersService", "$routeParams"];

function FarmersController($scope, $http, $location, $q, $rootScope, FarmersService, AuthService, BuyersService, $routeParams){
  $scope.user = AuthService.currentUser();
  $scope.myProducts;
  $scope.categories = [];
  $scope.approvedOrders = [];


FarmersService.getAllInventoryByUser($routeParams.id)
.then(function(data){
  $scope.myProducts = data.data;
})

$scope.createInventory = function(inventory) {
  inventory.category = inventory.category.categoryName
  inventory.price = parseInt(inventory.price);
  inventory.quantityAvailable = parseInt(inventory.quantityAvailable);
  inventory.user= null;

  if($scope.user.userType === 'Farmer') {
    FarmersService.createInventory(inventory)
    .then(function(res){
      $scope.myProducts.push(inventory);
      $scope.list = {};
    })
  } else {
    FarmersService.createInventoryByAdmin(inventory,$routeParams.id)
    .then(function(res) {
      $scope.myProducts.push(inventory);
      $scope.list = {};
    })
  }
}

  BuyersService.getAllCategories()
  .then(function(data){
    console.log("CATEGOREIS", data);
    $scope.categories = data.data;
  })
  BuyersService.getOrdersPending(true).then(function(data) {
      console.log("ARE PENDING", data.data);
      $scope.pendingOrders = data.data;
  })
  $scope.authorizeOrder = function(pending,index){
    FarmersService.authorizeOrder(pending)
    .then (function(data){
      console.log("Authorized Bitch!!",data);
        $scope.approvedOrders.push(pending);
        $scope.pendingOrders.splice(index,1)
    })
}
  $scope.deleteOrder = function(order,index){
    FarmersService.deleteOrder(order)
    .then(function(data){
      $scope.pendingOrders.splice(index,1);
    })

}

}
