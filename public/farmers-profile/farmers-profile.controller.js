angular
.module("farmers-profile.module")
.controller("FarmersProfileController", FarmersProfileController);

FarmersProfileController.$inject = ["$scope", "$http", "FarmersProfileService", "AuthService"]

function FarmersProfileController($scope, $http, FarmersProfileService, AuthService){
  $scope.user = AuthService.currentUser();
  // FarmersProfileService.getUser()
  // .then(function(data) {
  //
  //   })
    FarmersProfileService.getAllInventoryByUser($scope.user.userName)
    .then(function(data){
      $scope.myProducts = data.data;
      console.log("YYAY SHIT",$scope.myProducts);
    })


}
