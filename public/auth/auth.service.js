angular
  .module('FarmersMarket')
  .service('AuthService', function($http) {

    function loginUser(user){
      return $http.post('/login', user);
    }

    function logOutUser(user){
      return $http.post('/logout', user);
    }

    function createUser(user){
      console.log('you are working', user);
      return $http.post('/users',user);
    }

    return{
      loginUser:loginUser,
      logOutUser:logOutUser,
      createUser: createUser

    }
})
