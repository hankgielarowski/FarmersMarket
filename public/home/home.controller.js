var _ = require("underscore");

angular
.module("FarmersMarket")
.controller("HomeController", HomeController);

HomeController.$inject = ["$scope", "$http", "$location", "$q", "$rootScope", "$routeParams", "HomeService"];

function HomeController($scope,$http,$location,$q,$rootScope,$routeParams,HomeService) {
  HomeService.getUser()
  .then(function(data) {
    console.log("THIS SHOULD BE USERS", data);

  })


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
  //     console.log("NOTHIGN IS HAPPENING?");
  //   HomeService.createUser(user)
  //   console.log("you IS HAPPENING?", user);
  //     if(this.buyer)then(function(data) {
  //     $location.path('/buyers/:id');
  //   })
  //     if(this.farmer)then(function(data){
  //     $location.path('/farmers/:id');
  //   })
  // }

    // $scope.createFarmer = function(user) {
    //   console.log("NOTHIGN IS HAPPENING?");
    //
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
