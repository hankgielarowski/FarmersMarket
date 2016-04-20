angular
.module('farmers.module')
.controller('ModalSignupInstanceCtrl', function ($scope, $uibModalInstance, AuthService,$location,$window) {

  $scope.createUser = function (user) {
    AuthService.createUser(user)
    .success(function(res){
      $window.localStorage.setItem('mahUser', JSON.stringify(res));
      AuthService.user = res;
      alert("You Have Signed Up.  You WIll Be Granted Access Upon Administration Approval")
    })

    .error(function(err) {
    });
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.close('cancel');
  };
});
