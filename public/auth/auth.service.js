angular
  .module('FarmersMarket')
  .service('AuthService', function($http) {

    function getUser() {
      return $http.get('/users');
    }

    function loginUser(user){
      console.log("ARE YOU HAPPENING?");
      return $http.post('/login', user);
    }

    function logOutUser(user){
      return $http.post('/logout', user);
    }

    function createUser(user){
      return $http.post('/users',user);
    }


    return{
      getUser:getUser,
      loginUser:loginUser,
      logOutUser:logOutUser,
      createUser: createUser,
      isAuthenticated: false,
      user: null
    }
})
