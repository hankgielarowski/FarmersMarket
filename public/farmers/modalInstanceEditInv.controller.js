angular.module('farmers.module').controller('ModalInstanceEditInvController', function($scope, $uibModalInstance, FarmersService, $location, $window, inventory) {

  $scope.inventory= inventory;

$scope.updateInventory = function(inventory) {
    FarmersService.updateInventory(inventory.id, inventory).then(function(res) {
  });
    $uibModalInstance.close();
};
$scope.cancel = function() {
    $uibModalInstance.close('cancel');
};

});
