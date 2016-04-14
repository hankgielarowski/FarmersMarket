angular
  .module('buyers.module')
  .service('BuyersService', function($http){

        function getUser() {
          return $http.get('/users');
        }


        return {
          getUser: getUser,
          getAllInventory: getAllInventory
        }

  })
