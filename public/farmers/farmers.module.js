var angular = require("angular");
require("angular-route");
require("angular-ui-bootstrap");


angular
.module("farmers.module", [
  "ngRoute",
])
.config(function($routeProvider) {
  $routeProvider
    .when('/farmers/:id/',{
        templateUrl: "./farmers/views/farmers.html",
        controller: "FarmersController"
    })

})
