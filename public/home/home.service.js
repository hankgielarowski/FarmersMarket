angular
  .module('FarmersMarket')
  .service('HomeService', function($http) {


    function getUser() {
      return $http.get('/users');
    }

    function createFarmer(user) {
      return $http.post('/users', user);
    }

    function createBuyer(user) {
      return $http.post('/users', user);
    }

    return {
      getUser: getUser,
      createFarmer: createFarmer,
      createBuyer: createBuyer,
      // createUser: createUser

    }
  })
