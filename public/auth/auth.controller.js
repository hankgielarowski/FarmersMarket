angular
  .module('FarmersMarket')
  .controller('AuthController', AuthController);

<<<<<<< HEAD
  AuthController.$inject = ['$scope', "$http",'AuthService', '$routeParams', '$location'];

  function AuthController($scope,$http, AuthService, $routeParams, $location){

    $scope.createUser = function (user){
=======
  AuthController.$inject = ['$scope','$http', 'AuthService', '$routeParams', '$location'];

  function AuthController($scope,$http, AuthService, $routeParams, $location){

    $scope.loginUser = function (user)
>>>>>>> 348a1482644e2fccef154c86808c472d7ad70419
    AuthService.login(user).success(function(res){
      if(res.data.userType === 'Farmer') {
      $location.path("/farmers/"+ res.id);
    } else if (res.data.userType === 'Buyer') {
      $location.path("/buyers/" + res.id);
  }
    })
<<<<<<< HEAD
}
=======
  }
>>>>>>> 348a1482644e2fccef154c86808c472d7ad70419
