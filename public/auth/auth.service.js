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
<<<<<<< HEAD
      console.log('you are working', user);
      return $http.post('/users',user);
    }

=======
      return $http.post('/users',user);
    }


>>>>>>> 348a1482644e2fccef154c86808c472d7ad70419
    return{
      loginUser:loginUser,
      logOutUser:logOutUser,
      createUser: createUser
<<<<<<< HEAD

=======
      
>>>>>>> 348a1482644e2fccef154c86808c472d7ad70419
    }
})
