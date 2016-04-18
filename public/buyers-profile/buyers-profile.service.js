angular
  .module('buyers-profile.module')
  .service('BuyersProfileService', function($http,$window){

        function getAllInventoryByUser(userName){
          console.log("got me some corn", userName);
          return $http.get('/inventory/user/' + userName);
        }




return {
  getAllInventoryByUser:getAllInventoryByUser
  }

})
