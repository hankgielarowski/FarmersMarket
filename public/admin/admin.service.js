var angular = require('angular');

angular
  .module('admin.module')
  .service('AdminService', function($http){


    function getvalidateUser(){
      console.log("I am a user")
      return $http.get('/users/validate/');
    }

    function validateUser(user) {
      return $http.put('/users/validate/' + user.id)
    }

    function deleteUser(user) {
      return $http.delete('/users/'+ user.id)
    }



    return {
      getvalidateUser:getvalidateUser,
      validateUser:validateUser,
      deleteUser:deleteUser
    }

  })
