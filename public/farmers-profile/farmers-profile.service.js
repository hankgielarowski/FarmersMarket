angular
  .module('farmers-profile.module')
  .service('FarmersProfileService', function($http,$window){

        function getUser() {
          return $http.get('/users');
        }

return {
  getUser:getUser

  }
})
