
angular
.module("admin.module", [
  "ngRoute"
])
.config(function($routeProvider) {
  $routeProvider
    .when('/admin',{
      templateUrl: "views/admin.html",
      controller: "AdminController"
    })
})
