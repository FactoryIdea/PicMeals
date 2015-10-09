/*
app.controller('listMealsCtrl', ['$scope', 'listMeals', function($scope, listMeals) { 
    $scope.dishes = listMeals.success(function(data) { 
    $scope.dish = data; 
  });
    $scope.name="test";
}]);
*/


app.controller('ListMealsCtrl', function($scope, $http) {
  $scope.dishes = [];
  $http.get('http://dpd.info-maker.com/meals?public=1')
       .then(function(res){
          $scope.dishes = res.data;                
        });
});

/*
app.controller('listMealsCtrl', ['$scope','dpd','listMeals', function($scope, dpd, listMeals) { 
    //$scope.dishes = [{"title":"paste alla merda"}, {"title":"paste alla panna"}];
    $scope.name="test";
}]);
*/