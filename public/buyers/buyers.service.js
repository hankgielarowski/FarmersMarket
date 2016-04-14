angular
  .module('buyers.module')
  .service('BuyersService', function($http){

    function getUser() {
      return $http.get('/users');
    }

    function getAllInventoryByCategory(inventory, category){
      return $http.get('/inventory');
    }



        return {
          getUser: getUser,
          getAllInventoryByCategory: getAllInventoryByCategory,


        }

  })
