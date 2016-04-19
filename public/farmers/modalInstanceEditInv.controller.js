angular.module('farmers.module').controller('ModalInstanceEditInvController', function($scope, $uibModalInstance, FarmersService, $location, $window, inventory) {

  $scope.inventory= inventory;

$scope.updateInventory = function(inventory) {
    FarmersService.updateInventory(inventory.id, inventory).then(function(res) {
    //     console.log("CREATED", res);
    //     var id= inventory.id
    // FarmersService.updateInventory(id)
    //   .then(function(data){
    //
    //     })
    console.log(res);
  });
    $uibModalInstance.close();
};
$scope.cancel = function() {
    $uibModalInstance.close('cancel');
};

});
