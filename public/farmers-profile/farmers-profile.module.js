angular
.module("farmers-profile.module", [
  "ngRoute"
])
.config(function($routeProvider) {
  $routeProvider
    .when('/farmers-profile/:id/',{
      templateUrl: "./farmers-profile/views/farmers-profile.html",
      controller: "FarmersProfileController"
    })
})  
