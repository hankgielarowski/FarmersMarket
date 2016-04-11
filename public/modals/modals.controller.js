var angular = require('angular');

angular
.module('FarmersMarket')

.controller('ModalController', function ($scope, $uibModal, $log) {
  console.log("HELLO FROM LOGIN")


  $scope.animationsEnabled = true;

  $scope.open = function (user) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'modals/modalsignup.html',

      controller: 'ModalInstanceCtrl',
      user:user,

      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.open = function (farmer) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'modals/modallogin.html',
      controller: 'ModalInstanceCtrl',

      farmer:farmer,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

})

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

 .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, AuthService,$location) {

  $scope.createUser = function (user) {
    AuthService.createUser(user)
    $uibModalInstance.close();
  };
  $scope.loginUser = function (user) {
    console.log("TEST MODAL", user);
    AuthService.loginUser(user)
    .success(function(res){
      console.log(res);
      if(res.userType === 'Farmer') {
        $location.path("/farmers/"+ res.id);
      } else if (res.userType === 'Buyer') {
        $location.path("/buyers/" + res.id);
      }
    })
    .error(function(err) {
      console.log("SHIT", err);
    });
    $uibModalInstance.close();
  };
  // $scope.createBuyer = function (user) {
  //   HomeService.createBuyer(user)
  //   $uibModalInstance.close($scope.selected.item);
  // };


  $scope.cancel = function () {
    $uibModalInstance.close('cancel');
  };
});
