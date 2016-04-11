angular
  .module('farmers.module')
  .service('FarmersService', function($http){

        function getUser() {
          return $http.get('/users');
        }

        return {
          getUser: getUser
        }

  })
