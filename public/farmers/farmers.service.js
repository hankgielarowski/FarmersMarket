angular
  .module('farmers.module')
  .service('FarmersService', function($http,$window){
        //
        // function getUser() {
        //   return $http.get('/users');
        // }
        function createInventory(inventory){
          console.log("fuck: ", inventory);
          return $http.post('/inventory/', inventory);
        }

        function getAllInventory(inventory){
          console.log("ALL the corn", inventory);
          return $http.get('/inventory');
        }
        function getAllInventoryByUser(userName){
          console.log("got me some corn", userName);
          return $http.get('/inventory/user/' + userName);
        }

        // function getAllInventoryByCategory(type) {
        //   return $http.get('/inventory/' + type);
        // }
        return {
          // getUser: getUser,
          createInventory:createInventory,
          getAllInventory: getAllInventory,
          getAllInventoryByUser:getAllInventoryByUser
          // getAllInventoryByCategory: getAllInventoryByCategory
        }
  })
