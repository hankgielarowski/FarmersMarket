angular
  .module('farmers-profile.module')
  .service('FarmersProfileService', function($http,$window){


        function getAllInventoryByUser(userName){
          console.log("got me some corn", userName);
          return $http.get('/inventory/user/' + userName);
        }

        function getProfileUser(id) {
          return $http.get('/users/' + id);
        }


return {
  getAllInventoryByUser:getAllInventoryByUser,
  getProfile: getProfileUser
  }

})
