angular
.module("buyers-profile.module", [
  "ngRoute"
])
.config(function($routeProvider) {
  $routeProvider
    .when('/buyers-profile/:id/',{
      templateUrl: "./buyers-profile/views/buyers-profile.html",
      controller: "BuyersProfileController"
    })
})
