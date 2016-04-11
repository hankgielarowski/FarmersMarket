angular
.module('FarmersMarket')
  .controller('NavbarCtrl', function($scope, AuthService,$uibModal,$location) {
    $scope.isAuthenticated = function() {
      return AuthService.isAuthenticated;
    };

    $scope.openLogin = function() {
      console.log("WHAT UP");
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: './auth/views/modallogin.html',
        controller: 'ModalLoginInstanceCtrl',
        size: 'lg',
        resolve: {

        }
      });
    }

    $scope.logTheFuckOut = function() {
      var user= AuthService.user
        AuthService.logOutUser(user)
        .success(function(res) {
          AuthService.user = null;
          AuthService.isAuthenticated = false;
          $location.path("/");
        })
    }

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.openSignup = function() {
      console.log("WHAT SIGNUP");
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: './auth/views/modalsignup.html',
        controller: 'ModalSignupInstanceCtrl',
        size: 'lg',
        resolve: {

        }
      });
    }


    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };



  });
