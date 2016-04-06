angular
.module("farmers-profile.module", [
  "ngRoute"
])
.config(function($routeProvider) {
  $routeProvider
    .when('/farmers-profile',{
      templateUrl: "views/farmers-profile.html",
      controller: "FarmersProfileController"
    })
})
