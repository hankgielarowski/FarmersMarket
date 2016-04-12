angular
.module("farmers.module")
.controller("FarmersController", FarmersController);

FarmersController.$inject = ["$scope", "$http", "$location", "$q", "$rootScope", "FarmersService", "AuthService"];

function FarmersController($scope, $http, $location, $q, $rootScope, FarmersService, AuthService){
  $scope.user = AuthService.currentUser();
  FarmersService.getUser()
  .then(function(data) {
    // console.log("THIS SHOULD BE USERS", data);
    // console.log("TEST: ",AuthService.currentUser());
    $scope.user = AuthService.currentUser();

})
$scope.createInventory = function(inventory) {
  // inventory.user = $scope.user;
  console.log("LASTLY", inventory);
  FarmersService.createInventory(inventory)
  .success(function(res){
    console.log("SUCCES", res);
  })
}
$scope.getAllInventory = function(inventory) {
  FarmersService.getAllInventory()
  .then(function(data){

  })
}
}
