angular
.module("farmers.module")
.controller("FarmersController", FarmersController);

FarmersController.$inject = ["$scope", "$http", "$location", "$q", "$rootScope", "FarmersService", "AuthService"];

function FarmersController($scope, $http, $location, $q, $rootScope, FarmersService, AuthService){
  $scope.user = AuthService.currentUser();
  FarmersService.getUser()
  .then(function(data) {

    })
// FarmersService.getOneInventory(id)
// .then(function(data){
//
// })

$scope.createInventory = function(inventory) {
  inventory.price = parseInt(inventory.price);
  inventory.quantityAvailable = parseInt(inventory.quantityAvailable);
  inventory.user = null;
  console.log("LASTLY", inventory);
  FarmersService.createInventory(inventory)
  .then(function(res){
    console.log("SUCCES", res);
    window.corn = res.data;
    FarmersService.getOneInventory(res.data.category, res.data)
    .then(function(data){
      $scope.inventory = data.data;
      console.log("YYAY SHIT",data);
    })
  })
}


$scope.getAllInventory = function(inventory) {
  FarmersService.getAllInventory()
  .then(function(data){

  })
}
}
