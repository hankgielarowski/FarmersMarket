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
      return $http.post('/orders/' + id, order);
    }

    function createOrderAdmin(order, buyerId, id){
      return $http.post('/orders/admin/'+ buyerId + '/' + id , order);
    }

    function getOrdersPending(pending){
      console.log("Orders", pending);
      return $http.get('/orders/' + pending)
    }

    function getOrdersPendingByAdmin(userId){
      console.log('this is the userID from buyers service', userId);
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
