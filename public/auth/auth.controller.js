angular
  .module('FarmersMarket');
  .controller('AuthController', AuthController);

  AuthController.$inject = ['$scope', 'AuthService', '$routeParams', '$location'];

  function AuthController($scope, AuthService, $routeParams, $location){
    $scope.loginUser = function (user)
    AuthService.login(user).success(function(res){
      if(res.data.type === 'farmer') {
      $location.path("/farmers/"+ res.user.id);
    } else if (res.data.user.type === 'buyer') {
      $location.path("/buyers/" + res.user.id);
  }
    })



    })
  }
