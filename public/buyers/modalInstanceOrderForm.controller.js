angular.module('buyers.module').controller('ModalInstanceOrderFormController', function($scope, $uibModalInstance, BuyersService, $location, $window, AuthService) {

$scope.user = AuthService.currentUser();

$scope.createOrder = function(order){

  console.log("fucking shit",$scope.myProducts);
  
  order.quantityOrdered = order.quantityOrdered;


  BuyersService.createOrder(order)
  .then(function(res){
    console.log("SUCCES", res);

    $scope.order.push(order);
    $scope.thing = {};


    console.log("WHAT ARE WE SENDING", order);
    console.log("HOW MUCH", quantity);
    console.log("LOGINUSERS", window.localStorage.getItem('mahUser'));

})


    }

$scope.cancel = function() {
    $uibModalInstance.close('cancel');
};

});
