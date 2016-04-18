var angular = require('angular');

angular
  .module("admin.module")
  .controller("AdminController", AdminController);

  AdminController.$inject = ["$scope", "$http", "$location", "$q", "$rootScope", "AdminService"];

  function AdminController ($scope, $http, $location, $q, $rootScope, AdminService) {

    AdminService.getvalidateUser()
    .then(function(data){
      $scope.users = data.data;
      console.log("who",data)
    });

    $scope.validateUser = function(user) {
      AdminService.validateUser(user)
      .then (function(data){
        console.log("ldlkdaftujhasdfg",data);
      })

    }
}
  //   $scope.deleteUserDeniedByAdmin = function (user)
  //     this.destroy(user);
  // }
