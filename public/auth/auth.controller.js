angular
  .module('FarmersMarket')
  .controller('AuthController', AuthController);

  AuthController.$inject = ['$scope', "$http",'AuthService', '$routeParams', '$location'];

  function AuthController($scope,$http, AuthService, $routeParams, $location){

    $scope.createUser = function (user){
    AuthService.login(user).success(function(res){
      if(res.data.userType === 'Farmer') {
      $location.path("/farmers/"+ res.id);
    } else if (res.data.userType === 'Buyer') {
      $location.path("/buyers/" + res.id);
  }
    })
}
