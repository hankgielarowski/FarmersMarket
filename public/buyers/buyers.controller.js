angular
.module("buyers.module")
.controller("BuyersController", BuyersController);

BuyersController.$inject = ["$scope", "$http", "$location", "$q", "$rootScope", "BuyersService", "AuthService","_"];

function BuyersController($scope, $http, $location, $q, $rootScope, BuyersService, AuthService,_){

  $scope.user = AuthService.currentUser();
  $scope.pendingOrders = [];
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
      console.log(data)
    })

  $scope.createOrder = function(order){
    // var timeStampOrdered = new Date().toJSON().slice(0,10);
    //   return timeStampOrdered
    console.log($scope.myProducts);
    order.category = order.category;

    order.quantityOrdered = order.quantityOrdered;
    order.inventory = $scope.myProducts[0];
    BuyersService.createOrder(order)
    .then(function(res){
      console.log("SUCCES", res);

      $scope.pendingOrders.push(order);
      $scope.thing = {};

      //
      // console.log("WHAT ARE WE SENDING", order);
      // console.log("HOW MUCH", quantity);
      // console.log("LOGINUSERS", window.localStorage.getItem('mahUser'));
      // var timeStampOrdered = new Date().toJSON().slice(0,10);
      // console.log("time", timeStampOrdered);
      // return timeStampOrdered

})
      // BuyersService.getOrdersPending($scope.user.id)
      // .then(function(data){
      //   $scope.orders = data.data;
      //   console.log("ORDERS!!!",$scope.orders);
      // })

      }

}
