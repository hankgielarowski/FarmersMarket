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

        return {
          getAllInventoryByCategory: getAllInventoryByCategory,
          getAllCategories: getAllCategories,
          createOrder:createOrder

        }


  })
