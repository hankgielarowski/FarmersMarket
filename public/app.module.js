var angular = require("angular");
require("angular-route");
require("angular-ui-bootstrap");

angular
.module("FarmersMarket", [
  "ngRoute",
  'ui.bootstrap',
  'admin.module' ,
  'buyers.module' ,
  'buyers-profile.module' ,
<<<<<<< HEAD
  // 'farmers.module' ,
=======

>>>>>>> 348a1482644e2fccef154c86808c472d7ad70419
  'farmers-profile.module'
])
.config(function($routeProvider) {
  $routeProvider
    .when('/',{
      templateUrl: "home/views/home.html",
      controller: "HomeController"
    })
    .when('/admin', {
      templateUrl: "admin/views/admin.html",
      controller: "AdminController"
    })
    .when('/buyers', {
      templateUrl: "buyers/views/buyers.html",
      controller: "BuyersController"
    })
    .when('/buyers-profile', {
      templateUrl: "buyers-profile/views/buyers-profile.html",
      controller: "BuyersProfileController"
    })
    .when('/farmers', {
      templateUrl: "farmers/views/farmers.html",
      controller: "FarmersController"
    })
    .when('/farmers-profile', {
      templateUrl: "farmers-profile/views/farmers-profile.html",
      controller: "FarmersProfileController"
    })
})


require('./admin');
require('./buyers');
require('./buyers-profile');
require('./farmers');
require('./farmers-profile');
require('./home');
require('./modals');
require('./auth');
