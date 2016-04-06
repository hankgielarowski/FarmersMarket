angular
.module("buyers-prof.module", [
  "ngRoute"
])
.config(function($routeProvider) {
  $routeProvider
    .when('/buyers-prof',{
      templateUrl: "views/buyers-prof.html",
      controller: "BuyersProfController"
    })
})
