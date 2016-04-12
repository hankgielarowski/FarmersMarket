angular
  .module('farmers.module')
  .service('FarmersService', function($http){

        function getUser() {
          return $http.get('/users');
        }
        function createInventory(inventory){
          console.log("fuck,");
          return $http.post('/inventory', inventory);
        }
        function getAllInventory(inventory){
          return $http.get('/inventory', inventory);
        }


        return {
          getUser: getUser,
          createInventory:createInventory,
          getAllInventory:getAllInventory,
        }

  })
