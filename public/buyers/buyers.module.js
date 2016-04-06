angular
.module("buyers.module", [
  "ngRoute"
])
.config(function($routeProvider) {
  $routeProvider
    .when('/buyers',{
      templateUrl: "views/buyers.html",
      controller: "BuyersController"
    })
})
