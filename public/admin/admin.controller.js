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

    $scope.validateUser = function(user, index) {
      AdminService.validateUser(user)
      .then(function(data){
        console.log("ldlkdaftujhasdfg",data);
        $scope.users.splice(index, 1)
      })
    }


    $scope.deleteUserDeniedByAdmin = function (user, index) {
      AdminService.deleteUser(user)
      .then(function(data){
        $scope.users.splice(index, 1)
      })
    };
    $scope.showFarmer = false
    $scope.showBuyer = false


    $scope.getCatUsers = function(cat) {
      console.log("WE ARE GETTING SHIT?", cat)
      AdminService.getUsersInCategory(cat)
      .then(function(data){
          $scope.farmers = data.data.filter(function(el) {
            return el.userType === "Farmer";
          })

          $scope.buyers = data.data.filter(function(el) {
            return el.userType === "Buyer";
          })

          $scope.showFarmer = !$scope.showFarmer
          $scope.showBuyer = !$scope.showBuyer


      }).catch(function(err) {
        console.log("SHIT", err);
      });
    }





}
