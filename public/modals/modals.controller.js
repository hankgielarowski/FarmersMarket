var angular = require('angular');

angular
.module('FarmersMarket')

.controller('ModalController', function ($scope, $uibModal, $log) {



  $scope.animationsEnabled = true;

  $scope.open = function (buyer) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'modals/modalsignup.html',

      controller: 'ModalInstanceCtrl',
      buyer:buyer,

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

  .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, AuthService) {




  $scope.createUser = function (user) {
    AuthService.createUser(user)
    $uibModalInstance.close();
  };
  $scope.loginUser = function (user) {
    AuthService.loginUser(user)
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
