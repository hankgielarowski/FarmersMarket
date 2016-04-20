var _ = require("underscore");

angular
.module("FarmersMarket")
.controller("HomeController", HomeController);

HomeController.$inject = ["$scope", "$http", "$location", "$q", "$routeParams", "HomeService",'$uibModal'];

function HomeController($scope,$http,$location,$q,$routeParams,HomeService,$uibModal) {
  $scope.openLogin = function() {
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

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
}
