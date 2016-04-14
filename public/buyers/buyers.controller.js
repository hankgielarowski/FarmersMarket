angular
.module("buyers.module")
.controller("BuyersController", BuyersController);

BuyersController.$inject = ["$scope", "$http", "$location", "$q", "$rootScope", "BuyersService", "AuthService","_"];

function BuyersController($scope, $http, $location, $q, $rootScope, BuyersService, AuthService,_){

  $scope.user = AuthService.currentUser();
  $scope.myProducts;
// on image
  BuyersService.getAllInventoryByCategory()
  .then(function(data){
    $scope.myProducts = data.data;
    console.log("GROUB", _.groupBy(data.data,'category'));
    var cats = Object.keys(_.groupBy(data.data,'category'))
    console.log(cats);

    // console.log("YAY shit", _.groupBy(data.data,'category'));
    window.stuff = data.data;
  })

    BuyersService.getAllCategories()
    .then(function(data){
      $scope.categories = data.data;
      console.log(data)
    })

}
