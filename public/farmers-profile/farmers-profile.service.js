angular
  .module('farmers-profile.module')
  .service('FarmersProfileService', function($http,$window){


        function getAllInventoryByUser(userName){
          console.log("got me some corn", userName);
          return $http.get('/inventory/user/' + userName);
        }




return {
  getAllInventoryByUser:getAllInventoryByUser
  }

})
