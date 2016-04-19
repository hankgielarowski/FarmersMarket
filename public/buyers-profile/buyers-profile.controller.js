angular
.module("buyers-profile.module")
.controller("BuyersProfileController", BuyersProfileController);


BuyersProfileController.$inject = ["$scope", "$http", "BuyersProfileService", "AuthService", "$uibModal", "$routeParams"]


function BuyersProfileController($scope, $http, BuyersProfileService, AuthService, $uibModal, $routeParams){
  $scope.user = AuthService.currentUser();


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

  BuyersProfileService.getBuyerProfile($routeParams.buyerId).then(function (buyer) {
    console.log(buyer);
    $scope.buyer = buyer.data;
  })

  BuyersProfileService.getAllInventoryByUser($scope.user.id)
  .then(function(data){
    $scope.myProducts = data.data;
  })
}
