var angular = require("angular");
require("angular-route");
require("angular-ui-bootstrap");

angular
.module("buyers.module", [
  "ngRoute",
])
.config(function($routeProvider) {
  $routeProvider
    .when('/buyers/:id/',{
        templateUrl: "./buyers/views/buyers.html",
        controller: "BuyersController"
    })

})
