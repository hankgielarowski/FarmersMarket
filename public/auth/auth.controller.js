var angular = require('angular');
var _ = require("underscore");

angular
  .module("FarmersMarket")
  .controller('AuthController', AuthController);

  AuthController.$inject = ['$scope', '$q','$http', '$rootScope', 'AuthService', '$routeParams', '$location','$auth'];

  function AuthController($scope, $q, $http, $rootScope, AuthService, $routeParams, $location, $auth){
    console.log("COMING HOT")
    AuthService.getUser()
    .then(function(data) {
      console.log("THIS SHOULD BE USERS", data);
    })


    $scope.logOutUser = function(user) {
      $auth.logout();
    }

}
