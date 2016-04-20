var angular = require('angular');
var _ = require("underscore");

angular
  .module("FarmersMarket")
  .controller('AuthController', AuthController);

  AuthController.$inject = ['$scope', '$q','$http', '$rootScope', 'AuthService', '$routeParams', '$location','$auth'];

  function AuthController($scope, $q, $http, $rootScope, AuthService, $routeParams, $location, $auth){
    AuthService.getUser()
    .then(function(data) {
    })

    $scope.logOutUser = function(user) {
      $auth.logout();
    }

}
