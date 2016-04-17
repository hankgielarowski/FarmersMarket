angular
.module('FarmersMarket')
  .controller('NavbarCtrl', function($scope, AuthService,$uibModal,$location,$window) {
    $scope.isAuthenticated = function() {
      $scope.user = JSON.parse($window.localStorage.getItem('mahUser'))
      return AuthService.isAuthenticated();
    };

    if($window.localStorage.getItem('mahUser')) {
      $scope.user = JSON.parse($window.localStorage.getItem('mahUser'));
    }
    // $scope.user = JSON.parse($window.localStorage.getItem('mahUser'));

    $scope.openLogin = function() {
      console.log("WHAT UP");
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: './auth/views/modallogin.html',
        controller: 'ModalLoginInstanceCtrl',
        size: 'sm',
        resolve: {

        }
      });
    }

    $scope.logTheFuckOut = function() {
      var user= AuthService.user
        AuthService.logOutUser(user)
        .success(function(res) {
          AuthService.user = null;
          $location.path("/");
        })
    }

    $scope.goToProfile = function(user) {
      var user= AuthService.user.userName
      console.log("woo",AuthService.user);
        // .success(function(res) {
          $location.path("/farmers-profile/" + user);
        // })
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
        size: 'sm',
        resolve: {

        }
      });
    }


    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };



  });
