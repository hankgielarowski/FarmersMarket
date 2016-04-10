var angular = require('angular');

angular
.module('FarmersMarket')

.controller('ModalController', function ($scope, $uibModal, $log) {



  $scope.animationsEnabled = true;

  $scope.open = function (buyer) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'modals/modals.html',
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
      templateUrl: 'modals/modals.html',
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

<<<<<<< HEAD
=======
  .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, AuthService) {

>>>>>>> 348a1482644e2fccef154c86808c472d7ad70419


 .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, AuthService) {

  $scope.createUser = function (user) {
<<<<<<< HEAD

=======
>>>>>>> 348a1482644e2fccef154c86808c472d7ad70419
    AuthService.createUser(user)
    $uibModalInstance.close();
  };


  $scope.cancel = function () {
    $uibModalInstance.close('cancel');
  };
});
