angular.module('buyers-profile.module').controller('ModalInstanceEditBuyerController', function($scope, $uibModalInstance, BuyersProfileService, $location, $window, AuthService) {

$scope.user = AuthService.currentUser();

$scope.editUser = function(user) {
    AuthService.editUser(user).success(function(res) {
        console.log("CREATED", res);
        $window.localStorage.setItem('mahUser', JSON.stringify(res));
        AuthService.user = res;
        // alert("You Have Signed Up.  You WIll Be Granted Access Upon Administration Approval");
    }).error(function(err) {
        console.log("SHIT", err);
    });
    $uibModalInstance.close();
};
$scope.cancel = function() {
    $uibModalInstance.close('cancel');
};

});
