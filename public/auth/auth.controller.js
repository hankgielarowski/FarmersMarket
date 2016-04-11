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


    $scope.createUser = function (user) {
      $auth.signup(user)
      .success(function(res){
        console.log(res);
        if(res.userType === 'Farmer') {
          $location.path("/farmers/"+ res.id);
        } else if (res.userType === 'Buyer') {
          $location.path("/buyers/" + res.id);
        }
      })
      .error(function(err) {
        console.log("SHIT", err);
      });
      $uibModalInstance.close();
    };

    $scope.logOutUser = function(user) {
      $auth.logout();
    }

  // $scope.loginUser = function (user) {
  //      AuthService.login(user).success(function (res) {
  //        $location.path('/users/' + res.id)
  //      })
  //    }
  //
  //    if($routeParams.userId) {
  //      AuthService.getOneFarmer($routeParams.userId).then(function (currentUser) {
  //        $scope.currentuser = currentUser;
  //      });
  //    }




}
