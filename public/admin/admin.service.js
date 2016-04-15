angular
  .module('admin.module')
  .service('AdminService', function($http){


    function getAllUsers(users){
      console.log("I am a user", users)
      return $http.get('/users');
    }


        return {
          getAllUsers:getAllUsers

        }

  })
