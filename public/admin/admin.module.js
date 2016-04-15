var angular = require('angular');

angular
.module("admin.module", [
  "ngRoute"
])
.config(function($routeProvider) {
  $routeProvider
    .when('/admin/:id/',{
      templateUrl: "./admin/views/admin.html",
      controller: "AdminController"
    })
})
