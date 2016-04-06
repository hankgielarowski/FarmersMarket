angular
.module("home.module", [
  "ngRoute"
])
.config(function($routeProvider) {
  $routeProvider
    .when('/home',{
      templateUrl: "views/home.html",
      controller: "HomeController"
    })
})
