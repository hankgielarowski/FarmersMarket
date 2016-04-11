var _ = require("underscore");

angular
.module("FarmersMarket")
.controller("HomeController", HomeController);

HomeController.$inject = ["$scope", "$http", "$location", "$q", "$routeParams", "HomeService",'$uibModal'];

function HomeController($scope,$http,$location,$q,$routeParams,HomeService,$uibModal) {
  $scope.openLogin = function() {
    console.log("WHAT UP");
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: './auth/views/modallogin.html',
      controller: 'ModalLoginInstanceCtrl',
      size: 'size',
      resolve: {

      }
    });
  }


  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

  // $scope.openSignup = function(size) {
  //   console.log("WHAT SIGNUP");
  //   var modalInstance = $uibModal.open({
  //     animation: $scope.animationsEnabled,
  //     templateUrl: './auth/views/modalsignup.html',
  //     controller: 'ModalSignupInstanceCtrl',
  //     size: size,
  //     resolve: {
  //
  //     }
  //   });
  // }


  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };



}
