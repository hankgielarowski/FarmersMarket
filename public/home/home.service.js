angular
  .module('FarmersMarket')
  .service('HomeService', function($http) {


    function getUser() {
      return $http.get('/users');
    }

    return {
      getUser: getUser
    }
  })
