angular
  .module('buyers.module')
  .service('BuyersService', function($http){


    function getAllInventoryByCategory(inventory, category){
      return $http.get('/inventory');
    }

    function getAllCategories(){
      return $http.get('/categories');
    }

    // function getAllInventoryByCategory(category){
    //   return $http.get('/inventory/category/' + category);
    // }
    function createOrder(order){
      return $http.post('/orders',order);
    }

    function getOrdersPending(order){
      console.log("NEED SOME ORDERS", order)
      return $http.get('/orders', order);
    }

    // function getUserOrders(userName){
    //   return $http.get('/orders/' + userName);
    // }

        return {
          getAllInventoryByCategory: getAllInventoryByCategory,
          getAllCategories: getAllCategories,
          createOrder:createOrder,
          getOrdersPending: getOrdersPending
          // getUserOrders: getUserOrders

        }


  })
