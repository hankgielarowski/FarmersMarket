var _ = require("underscore");

angular
.module("FarmersMarket")
.controller("HomeController", HomeController);

HomeController.$inject = ["$scope", "$http", "$location", "$q", "$rootScope", "$routeParams", "HomeService",'$uibModal'];

function HomeController($scope,$http,$location,$q,$rootScope,$routeParams,HomeService,$uibModal) {
  $scope.openLogin = function() {
    console.log("WHAT UP");
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: './auth/views/modallogin.html',
      controller: 'ModalLoginInstanceCtrl',
      size: 'lg',
      resolve: {

      }
    });
  }


  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

  $scope.openSignup = function() {
    console.log("WHAT SIGNUP");
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: './auth/views/modalsignup.html',
      controller: 'ModalSignupInstanceCtrl',
      size: 'lg',
      resolve: {

      }
    });
  }


  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
  // HomeService.getUser()
  // .then(function(data) {
  //   console.log("THIS SHOULD BE USERS", data);
  //
  // })

  //   getUser = function(user) {
  //   console.log("NOTHIGN IS HAPPENING?");
  //   HomeService.getUser(user)
  //   .then(function(data){
  //     console.log('SUCCESS: ', data);
  //     $location.path('/users');
  //   },function error(err) {
  //     console.log("nope: ", err)
  //   })
  // }
  // $scope.createUser = function(user){
  //   HomeService.createUser(user)
  //     if(this.buyer)then(function(data) {
  //     $location.path('/buyers/:id');
  //   })
  //     if(this.farmer)then(function(data){
  //     $location.path('/farmers/:id');
  //   })
  // }

  // $scope.createFarmer = function(user) {
  //   console.log("NOTHIGN IS HAPPENING?");

  //   HomeService.createFarmer(user)
  //     .then(function(data) {
  //       console.log('SUCCESS: ', data);
  //       $location.path('/farmers');
  //     },function error(err) {
  //       console.log("FUCK!: ", err);
  //     })
  // }
  // $scope.createBuyer = function(user) {
  //   console.log("NOTHIGN IS HAPPENING?");
  //
  //   HomeService.createBuyer(user)
  //     .then(function(data) {
  //       console.log('SUCCESS: ', data);
  //       $location.path('/buyers');
  //     },function error(err) {
  //       console.log("FUCK!: ", err);
  //     })
  // }
}
