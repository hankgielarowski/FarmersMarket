var angular = require("angular");
require("angular-route");

angular
.module("FarmersMarket", [
  "ngRoute",
  'admin.module' ,
  'buyers.module' ,
  'buyers-profile.module' ,
  'farmers.module' ,
  'farmers-profile.module' ,
  'home.module'
])
.config(function($routeProvider) {
  $routeProvider
    .when('/',{
      templateUrl: "home/views/home.html",
      controller: "HomeController"
    })
})


require('./admin/');
require('./buyers/');
require('./buyers-profile/');
require('./farmers/');
require('./farmers-profile/');
require('./home/');
