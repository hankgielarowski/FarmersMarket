angular
.module('farmers.module')
.controller('ModalLoginInstanceCtrl', function ($scope, $uibModalInstance, AuthService,$location,$window) {


 $scope.loginUser = function (user) {
   console.log("TEST MODAL", user);
   AuthService.loginUser(user)
   .success(function(res){
     console.log("RIGHT?",res);
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
     alert("Incorrect Password");
   });

   $uibModalInstance.close();
 };
 


 $scope.cancel = function () {
   $uibModalInstance.close('cancel');
 };
});
