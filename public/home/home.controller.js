var _ = require("underscore");

angular
.module("FarmersMarket")
.controller("HomeController", HomeController);

HomeController.$inject = ["$scope", "$http", "$location", "$q", "$rootScope", "HomeService"];

function HomeController($scope,$http,$location,$q,$rootScope,HomeService) {
  HomeService.getUser()
  .then(function(data) {
    console.log("THIS SHOULD BE USERS", users);

  })
}
