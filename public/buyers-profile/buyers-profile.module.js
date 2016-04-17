angular
.module("buyers-profile.module", [
  "ngRoute"
])
.config(function($routeProvider) {
  $routeProvider
    .when('/buyers-profile',{
      templateUrl: "./buyers-profile/views/buyers-profile.html",
      controller: "BuyersProfileController"
    })
})
