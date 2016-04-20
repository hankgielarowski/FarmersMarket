angular
  .module('buyers.module')
  .service('BuyersService', function($http){

    function getAllInventoryByCategory(inventory, category){
      return $http.get('/inventory');
    }

    function getAllCategories(){
      return $http.get('/categories');
    }

    function createOrder(order, id){
      console.log("orders",order);
      return $http.post('/orders/' + id, order);
    }

    function createOrderAdmin(order, buyerId, id){
      console.log("ADMIN orders", order);
      return $http.post('/orders/admin/'+ buyerId + '/' + order.inventory.id , order);
    }

    function getOrdersPending(pending){
      return $http.get('/orders/' + pending)
    }

    function getOrdersPendingByAdmin(userId) {
      return $http.get('/orders/user/' + userId)
    }

      return {
          getAllInventoryByCategory: getAllInventoryByCategory,
          getAllCategories: getAllCategories,
          createOrder:createOrder,
          getOrdersPending:getOrdersPending,
          createOrderAdmin:createOrderAdmin,
          getOrdersPendingByAdmin:getOrdersPendingByAdmin
        }
  })
