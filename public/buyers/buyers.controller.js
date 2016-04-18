angular
.module("buyers.module")
.controller("BuyersController", BuyersController);

BuyersController.$inject = ["$scope", "$http", "$location", "$q", "$rootScope", "BuyersService", "AuthService","_", "$uibModal"];

function BuyersController($scope, $http, $location, $q, $rootScope, BuyersService, AuthService, _, $uibModal){

  $scope.user = AuthService.currentUser();
  $scope.myProducts;

  $scope.showThisCat = function(category) {
    $scope.showCat = category;
  }
// on image
  BuyersService.getAllInventoryByCategory()
  .then(function(data){
    $scope.myProducts = data.data;
    console.log("PRDS", data.data);
    console.log("GROUB", _.groupBy(data.data,'category'));
    var cats = Object.keys(_.groupBy(data.data,'category'))
    console.log(cats);

    // console.log("YAY shit", _.groupBy(data.data,'category'));
    window.stuff = data.data;
  })

    BuyersService.getAllCategories()
    .then(function(data){
      $scope.categories = data.data;

    })
    $scope.createOrder = function() {
      console.log("WHAT UP");
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: './buyers/views/modalOrder.html',
        controller: 'ModalInstanceOrderFormController',
        size: 'sm',
        resolve: {

        }
      });
    }
}
