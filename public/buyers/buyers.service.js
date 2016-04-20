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
      return $http.post('/orders/admin/'+ buyerId + '/' + order.id , order);
    }

    function getOrdersPending(pending){
      return $http.get('/orders/' + pending)
    }

      return {
          getAllInventoryByCategory: getAllInventoryByCategory,
          getAllCategories: getAllCategories,
          createOrder:createOrder,
          getOrdersPending:getOrdersPending,
          createOrderAdmin:createOrderAdmin
        }
  })
