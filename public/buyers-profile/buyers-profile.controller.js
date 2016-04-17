angular
.module("buyers-profile.module")
.controller("BuyersProfileController", BuyersProfileController);

BuyersProfileController.$inject = ["$scope", "$http", "BuyersProfileService", "AuthService"]

function BuyersProfileController($scope, $http, BuyersProfileService, AuthService){
  $scope.shit = AuthService.currentUser(user);
  console.log("I am user", user );

  $scope.editUser = function() {
    console.log("WHAT UP");
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: './buyers-profile/views/modaledit.html',
      controller: 'ModalInstanceEditBuyerController',
      size: 'sm',
      resolve: {

      }
    });
  }
}
