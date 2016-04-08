angular
  .module('FarmersMarket')
  .service('AuthService', function($http) {

    function loginUser(user){
      return $http.post('/login', user);
    }

    function logOutUser(user){
      return $http.post('/logout', user);
    }

    return{
      loginUser:loginUser,
      logOutUser:logOutUser

    }
