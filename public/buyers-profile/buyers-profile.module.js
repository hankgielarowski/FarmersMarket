angular
.module("buyers-profile.module", [
  "ngRoute"
])
.config(function($routeProvider) {
  $routeProvider
    .when('/buyers-profile',{
      templateUrl: "views/buyers-profile.html",
      controller: "BuyersProfileController"
    })
})
