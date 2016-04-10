var angular = require('angular');
var _ = require("underscore");

angular
  .module("FarmersMarket")
  .controller('AuthController', AuthController);

  AuthController.$inject = ['$scope', '$q','$http', '$rootScope', 'AuthService', '$routeParams', '$location'];

  function AuthController($scope, $q, $http, $rootScope, AuthService, $routeParams, $location){
    AuthService.getUser()
    .then(function(data) {
      console.log("THIS SHOULD BE USERS", data);

    })
    $scope.loginUser = function (user){
    AuthService.login(user).success(function(res){
      if(res.data.userType === 'Farmer') {
      $location.path("/farmers/"+ res.data.id);
    } else if (res.data.userType === 'Buyer') {
      $location.path("/buyers/" + res.data.id);
  }
    })
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


>>>>>>> beba0ab2b50b472a3c02f495f5821116bece64ce
}
