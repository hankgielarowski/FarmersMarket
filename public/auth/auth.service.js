angular
  .module('FarmersMarket')
  .service('AuthService', function($http,$window) {

    function getUser() {
      return $http.get('/users');
    }

    function isAuthenticated() {
      if($window.localStorage.getItem('mahUser')) {
        return true;
      }
      return false;
    }

    function goToProfile(user){
      console.log("PRofile", user);
      return $http.get("/users");
    }

    function loginUser(user){
      console.log("ARE YOU HAPPENING?");
      return $http.post('/login', user);
    }

    function logOutUser(user){
      localStorage.removeItem('mahUser');
      return $http.post('/logout', user);
    }

    function createUser(user){
      return $http.post('/users',user);
    }

    function currentUser() {
      if($window.localStorage.getItem('mahUser')) {
        var user = JSON.parse($window.localStorage.getItem('mahUser'));
        return user;
      } else {
        return false;
      }
    }

    function editUser(user) {
      return $http.put('/users/' + user.id, user);
    }


    return {
      getUser:getUser,
      loginUser:loginUser,
      logOutUser:logOutUser,
      createUser: createUser,
      user: null,
      isAuthenticated: isAuthenticated,
      currentUser: currentUser,
      goToProfile:goToProfile,
      editUser: editUser
    }
})
