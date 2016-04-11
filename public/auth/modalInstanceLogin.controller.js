angular
.module('farmers.module')
.controller('ModalLoginInstanceCtrl', function ($scope, $uibModalInstance, AuthService,$location) {


 $scope.loginUser = function (user) {
   console.log("TEST MODAL", user);
   AuthService.loginUser(user)
   .success(function(res){
     console.log("RIGHT?",res);
     AuthService.isAuthenticated = true;
     AuthService.user = res;
     if(res.userType === 'Farmer') {
       $location.path("/farmers/"+ res.id);
     } else if (res.userType === 'Buyer') {
       $location.path("/buyers/" + res.id);
     }
   })
   .error(function(err) {
     console.log("SHIT", err);
     alert("I Password");
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
