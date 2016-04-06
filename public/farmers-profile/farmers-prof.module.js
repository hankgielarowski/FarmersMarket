angular
.module("farmers-prof.module", [
  "ngRoute"
])
.config(function($routeProvider) {
  $routeProvider
    .when('/farmers-prof',{
      templateUrl: "views/farmers-prof.html",
      controller: "FarmersProfController"
    })
})
