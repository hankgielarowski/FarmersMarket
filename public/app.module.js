var angular = require("angular");

require("angular-route");
require("angular-ui-bootstrap");
require("satellizer");

angular
.module("FarmersMarket",[
  "ngRoute",
  'ui.bootstrap',
  'admin.module' ,
  'buyers.module' ,
  'buyers-profile.module',
  'farmers.module',
  'farmers-profile.module',
  'satellizer'
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
    // .when('/buyers', {
    //   templateUrl: "buyers/views/buyers.html",
    //   controller: "BuyersController"
    // })
    .when('/buyers-profile', {
      templateUrl: "buyers-profile/views/buyers-profile.html",
      controller: "BuyersProfileController"
    })
    .when('/farmers-profile', {
      templateUrl: "farmers-profile/views/farmers-profile.html",
      controller: "FarmersProfileController"
    })
})
.config(function($authProvider) {
  $authProvider.loginUrl = '/login';
  $authProvider.signupUrl = '/users';
})


require('./admin');
require('./buyers');
require('./buyers-profile');
require('./farmers-profile');
require('./home');
require('./farmers');
require('./auth');
