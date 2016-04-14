angular
  .module('buyers.module')
  .service('BuyersService', function($http){


    function getAllInventoryByCategory(inventory, category){
      return $http.get('/inventory');
    }

    function getAllCategories(){
      return $http.get('/categories');
    }

        return {
          getAllInventoryByCategory: getAllInventoryByCategory,
          getAllCategories: getAllCategories

        }

  })
