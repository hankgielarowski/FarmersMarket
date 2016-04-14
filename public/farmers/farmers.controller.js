angular
.module("farmers.module")
.controller("FarmersController", FarmersController);

FarmersController.$inject = ["$scope", "$http", "$location", "$q", "$rootScope", "FarmersService", "AuthService"];

function FarmersController($scope, $http, $location, $q, $rootScope, FarmersService, AuthService){
  $scope.user = AuthService.currentUser();
  $scope.myProducts;
  FarmersService.getUser()
  .then(function(data) {

    })
// FarmersService.getOneInventory(id)
// .then(function(data){
//
// })

FarmersService.getAllInventoryByUser($scope.user.userName)
.then(function(data){
  $scope.myProducts = data.data;
  console.log("YYAY SHIT",$scope.myProducts);
})

$scope.createInventory = function(inventory) {
  inventory.price = parseInt(inventory.price);
  inventory.quantityAvailable = parseInt(inventory.quantityAvailable);
  inventory.user = null;
  console.log("LASTLY", inventory);
  FarmersService.createInventory(inventory)
  .then(function(res){
    console.log("SUCCES", res);
    window.corn = res.data;

  })
}


$scope.getAllCategories = function(inventory) {
  FarmersService.getAllCategories()
  .then(function(data){

  })
}
}
