angular
.module('farmers.module')
.controller('ModalSignupInstanceCtrl', function ($scope, $uibModalInstance, AuthService,$location,$window) {

  $scope.createUser = function (user) {
    AuthService.createUser(user)
    .success(function(res){
      console.log("CREATED",res);
      $window.localStorage.setItem('mahUser', JSON.stringify(res));
      AuthService.user = res;
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
  


  $scope.cancel = function () {
    $uibModalInstance.close('cancel');
  };
});
