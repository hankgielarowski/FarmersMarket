angular
.module("buyers.module")
.controller("BuyersController", BuyersController);

BuyersController.$inject = ["$scope", "$http", "$location", "$q", "$rootScope", "BuyersService"];

function BuyersController($scope, $http, $location, $q, $rootScope, BuyersService){
  BuyersService.getUser()
  .then(function(data) {
    console.log("THIS SHOULD BE USERS", data);

  })

}

$scope.getAllInventory = function(inventory) {
  FarmersService.getAllInventory()
  .then(function(data){

  })
}
