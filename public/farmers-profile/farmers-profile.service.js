angular
  .module('farmers-profile.module')
  .service('FarmersProfileService', function($http,$window){

        // function getUser() {
        //   return $http.get('/users');
        // }

        function getAllInventoryByUser(userName){
          console.log("got me some corn", userName);
          return $http.get('/inventory/user/' + userName);
        }




return {
  // getUser:getUser,
  getAllInventoryByUser:getAllInventoryByUser
  }

})
