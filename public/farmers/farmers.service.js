angular
  .module('farmers.module')
  .service('FarmersService', function($http,$window){

        function createInventory(inventory){
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

        function getOrdersPending(pending){
          return $http.get('/orders/' + pending)
        }

        function authorizeOrder(pending){
          return $http.put('/orders/authorize/' + pending.id)
        }

        return {
          createInventory:createInventory,
          getAllInventory: getAllInventory,
          getAllInventoryByUser:getAllInventoryByUser,
          getOrdersPending:getOrdersPending,
          authorizeOrder:authorizeOrder

        }
  })
