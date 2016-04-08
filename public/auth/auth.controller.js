angular
  .module('FarmersMarket');
  .controller('AuthController', AuthController);

  AuthController.$inject = ['$scope', 'AuthService', '$routeParams'];

  function AuthController($scope, AuthService, $routeParams){
    $scope.loginUser = function (user)
    AuthService.login(user).success(function(res){

    })



    })
  }
