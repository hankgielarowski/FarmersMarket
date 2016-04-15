var angular = require('angular');

angular
  .module("admin.module")
  .controller("AdminController", AdminController);

  AdminController.$inject = ["$scope", "$http", "$location", "$q", "$rootScope", "AdminService"];

  function AdminController ($scope, $http, $location, $q, $rootScope, AdminService) {

    AdminService.getAllUsers()
    .then(function(data){
      $scope.user = data.data;
      console.log("who",data)
    });

  }
