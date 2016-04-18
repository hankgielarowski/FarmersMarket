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
      console.log("posted orders!!!!", order);
      return $http.post('/orders/' + order.id, order);
    }

    function getOrdersPending(pending){
      return $http.get('/orders/' + pending)
    }


        return {
          getAllInventoryByCategory: getAllInventoryByCategory,
          getAllCategories: getAllCategories,
          createOrder:createOrder,
          getOrdersPending:getOrdersPending

        }
  })
