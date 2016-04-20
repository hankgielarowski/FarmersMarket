angular
  .module('farmers.module')
  .service('FarmersService', function($http,$window, $rootScope){

        function createInventory(inventory){
          return $http.post('/inventory/', inventory);
        }

        function createInventoryByAdmin(inventory,userId) {
          return $http.post('/inventory/user/' + userId, inventory);
        }

        function getAllInventory(inventory){
          return $http.get('/inventory');
        }

        function getAllInventoryByUser(userName){
          return $http.get('/inventory/user/' + userName);
        }

        function getOrdersPending(pending){
          return $http.get('/orders/' + pending)
        }

        function authorizeOrder(pending){
          return $http.put('/orders/authorize/' + pending.id)
        }

        function deleteOrder(order){
          return $http.delete('/orders/' + order.id)
        }

        function deleteInventory(id){
          return $http.delete('/inventory/' + id)
        }

        function updateInventory(id, inventory){
          return $http.put('/inventory/' + id, inventory).then(function () {
              $rootScope.$broadcast('product:updated');
          })
        }

        return {
          createInventory:createInventory,
          getAllInventory: getAllInventory,
          getAllInventoryByUser:getAllInventoryByUser,
          getOrdersPending:getOrdersPending,
          authorizeOrder:authorizeOrder,
          deleteOrder:deleteOrder,
          createInventoryByAdmin: createInventoryByAdmin,
          deleteInventory:deleteInventory,
          updateInventory:updateInventory

        }
  })
