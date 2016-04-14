angular
  .module('farmers.module')
  .service('FarmersService', function($http,$window){

        function getUser() {
          return $http.get('/users');
        }
        function createInventory(inventory){
          console.log("fuck: ", inventory);
          return $http.post('/inventory/', inventory);
        }

        function getAllInventory(inventory){
          console.log("ALL the corn", inventory);
          return $http.get('/inventory');
        }
        function getOneInventory(id, inventory){
          console.log("got me some corn", inventory);
          return $http.get('/inventory/' + id);
        }

        function getAllInventoryByCategory(type) {
          return $http.get('/inventory/' + type);
        }
        return {
          getUser: getUser,
          createInventory:createInventory,
          getAllInventory: getAllInventory,
          getOneInventory: getOneInventory,
          getAllInventoryByCategory: getAllInventoryByCategory
        }
  })
