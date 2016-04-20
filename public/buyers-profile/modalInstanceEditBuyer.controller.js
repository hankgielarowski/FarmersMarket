angular.module('buyers-profile.module').controller('ModalInstanceEditBuyerController', function($scope, $uibModalInstance, BuyersProfileService, $location, $window, AuthService) {

$scope.user = AuthService.currentUser();

$scope.editUser = function(user) {
    AuthService.editUser(user).success(function(res) {
        $window.localStorage.setItem('mahUser', JSON.stringify(res));
        AuthService.user = res;
    }).error(function(err) {
    });
    $uibModalInstance.close();
  };
$scope.cancel = function() {
    $uibModalInstance.close('cancel');
  };
  });
