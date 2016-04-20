angular
.module('farmers.module')
.controller('ModalLoginInstanceCtrl', function ($scope, $uibModalInstance, AuthService,$location,$window) {

 $scope.loginUser = function (user) {
   AuthService.loginUser(user)
   .success(function(res){
     $window.localStorage.setItem('mahUser', JSON.stringify(res));
     AuthService.user = res;
     if(res.userType === 'Farmer') {
       $location.path("/farmers/"+ res.id);
     }  if(res.userType === 'Buyer') {
       $location.path("/buyers/" + res.id);
     } else if(res.userType === 'Admin') {
       $location.path("/admin/" + res.id)
     }

   })
   .error(function(err) {
     alert("Incorrect Password");
   });

   $uibModalInstance.close();
   };

   $scope.cancel = function () {
   $uibModalInstance.close('cancel');
  };
  });
