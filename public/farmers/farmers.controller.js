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
  $scope.myProducts = data.data;
})
$scope.$on('product:updated', function () {
  FarmersService.getAllInventoryByUser($routeParams.id)
  .then(function(data){
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
    $scope.categories = data.data;
  })

  if($scope.user.userType === "Farmer") {
    BuyersService.getOrdersPending(true).then(function(data) {
        $scope.pendingOrders = data.data;
  })
  BuyersService.getOrdersPending(false).then(function(data) {
      $scope.pendingOrders = data.data;
  })
} else if($scope.user.userType === "Admin") {
  BuyersService.getOrdersPendingByAdmin($routeParams.id)
    .then(function(data){
      $scope.pendingOrders = data.data.filter(function(order){
        return order.pendingApproval === true;
      })
      $scope.approvedOrders = data.data.filter(function(order){
        return order.pendingApproval === false;
      })
    })
};


  $scope.authorizeOrder = function(pending,index){
    FarmersService.authorizeOrder(pending)
    .then (function(data){
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
