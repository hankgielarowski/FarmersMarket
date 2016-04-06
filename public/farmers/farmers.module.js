angular
.module("farmers.module", [
  "ngRoute"
])
.config(function($routeProvider) {
  $routeProvider
    .when('/farmers',{
      templateUrl: "views/farmers.html",
      controller: "FarmersController"
    })
})
