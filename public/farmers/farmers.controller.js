  angular
.module("farmers.module")
.controller("FarmersController", FarmersController);

FarmersController.$inject = ["$scope", "$http", "$location", "$q", "$rootScope", "FarmersService", "AuthService","BuyersService"];

function FarmersController($scope, $http, $location, $q, $rootScope, FarmersService, AuthService, BuyersService){
  $scope.user = AuthService.currentUser();
  $scope.myProducts;
  $scope.categories = [];
  // FarmersService.getUser()
  // .then(function(data) {
  //
  //   })
// FarmersService.getOneInventory(id)
// .then(function(data){
//
// })

FarmersService.getAllInventoryByUser($scope.user.id)
.then(function(data){
  $scope.myProducts = data.data;
  console.log("YYAY SHIT",$scope.myProducts);
})

$scope.createInventory = function(inventory) {
  inventory.category = inventory.category.categoryName
  inventory.price = parseInt(inventory.price);
  inventory.quantityAvailable = parseInt(inventory.quantityAvailable);
  inventory.user = null;
  FarmersService.createInventory(inventory)
  .then(function(res){
    // console.log("SUCCES", res);
    // window.corn = res.data;
    $scope.myProducts.push(inventory);

  })
}


  BuyersService.getAllCategories()
  .then(function(data){
    console.log("CATEGOREIS", data);
    $scope.categories = data.data;
  })
}
