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

    $scope.openLogin = function() {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: './auth/views/modallogin.html',
        controller: 'ModalLoginInstanceCtrl',
        size: 'sm',
        resolve: {
        }
      });
    }

    $scope.logOut = function() {
      var user= AuthService.user
        AuthService.logOutUser(user)
        .success(function(res) {
          AuthService.user = null;
          $location.path("/");
        })
    }

    $scope.goToProfile = function(user) {
      var profile= AuthService.user
        if(profile.userType === "Farmer"){
          $location.path("/farmers-profile/" + profile.id)
      } else if(profile.userType === "Buyer"){
        $location.path("/buyers-profile/" + profile.id)
      }
    }
    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.openSignup = function() {
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
