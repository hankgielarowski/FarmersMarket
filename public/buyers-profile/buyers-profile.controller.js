angular
.module("buyers-profile.module")
.controller("BuyersProfileController", BuyersProfileController);

BuyersProfileController.$inject = ["$scope", "$http", "BuyersProfileService", "AuthService"]

function BuyersProfileController($scope, $http, BuyersProfileService, AuthService){
  $scope.user = AuthService.currentUser();
  // BuyersProfileService.getUser()
  // .then(function(data) {
  //
  //   })
  //   BuyersProfileService.getAllInventoryByUser($scope.user.userName)
  //   .then(function(data){
  //     $scope.myProducts = data.data;
  //     console.log("YYAY SHIT",$scope.myProducts);
  //   })


}
