  angular
.module("farmers.module")
.controller("FarmersController", FarmersController);

FarmersController.$inject = ["$scope", "$http", "$location", "$q", "$rootScope", "FarmersService", "AuthService","BuyersService", "$routeParams", "$uibModal"];

function FarmersController($scope, $http, $location, $q, $rootScope, FarmersService, AuthService, BuyersService, $routeParams, $uibModal){
  $scope.user = AuthService.currentUser();
  $scope.myProducts;
  $scope.categories = [];
  $scope.approvedOrders = [];

FarmersService.getAllInventoryByUser($routeParams.id)
.then(function(data){
  console.log("DREW",data);
  $scope.myProducts = data.data;
})
$scope.$on('product:updated', function () {
  FarmersService.getAllInventoryByUser($routeParams.id)
  .then(function(data){
    console.log("DREW",data);
    $scope.myProducts = data.data;
  })
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

$scope.deleteInventory = function(inventory,index){
  var id= inventory.id
  FarmersService.deleteInventory(id)
  .then(function(data){
    $scope.myProducts.splice(index,1);
  })

}

$scope.updateInventory = function(product) {
  console.log("we workin");
  var modalInstance = $uibModal.open({
    animation: $scope.animationsEnabled,
    templateUrl: './farmers/views/modaleditInv.html',
    controller: 'ModalInstanceEditInvController',
    size: 'sm',
    resolve: {
      inventory: function(){
        return product;
      }
    }
  });
}

}
