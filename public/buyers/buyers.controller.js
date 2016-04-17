angular
.module("buyers.module")
.controller("BuyersController", BuyersController);

BuyersController.$inject = ["$scope", "$http", "$location", "$q", "$rootScope", "BuyersService", "AuthService","_"];

function BuyersController($scope, $http, $location, $q, $rootScope, BuyersService, AuthService,_){

  $scope.user = AuthService.currentUser();
  $scope.myProducts;
  // $scope.order;

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
      console.log(data)
    })

    $scope.createOrder = function(order,quantity) {
      console.log("WHAT ARE WE SENDING", order);
      console.log("HOW MUCH", quantity);
      console.log("LOGINUSERS", window.localStorage.getItem('mahUser'));
      var timeStampOrdered = new Date().toJSON().slice(0,10);
      console.log("time", timeStampOrdered);
      return timeStampOrdered

      // var thingToSend = {
      //   quantity: quantity,
      //   category: order,
      //
      // };

      BuyersService.getOrdersPending()
      .then(function(data){
        console.log("ORDER ME", data);
        $scope.order = data.data;

      })

    }





}
