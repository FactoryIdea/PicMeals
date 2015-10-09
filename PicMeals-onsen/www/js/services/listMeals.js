/*
app.factory('listMeals', ['$http', function($http) { 
  return $http.get('http://dpd.info-maker.com/meals') 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);
*/
/*
app.service('listMeals', ['$http','dpd', function($http, dpd) { 
  $scope.dishes = [];    
  return $http.get('http://dpd.info-maker.com/meals?public=1&include=user') 
            .success(function(data) { 
              $scope.dishes = data; 
            }) 
            .error(function(err) { 
              //return err; 
            }); 
}]);

*/
app.factory('listMeals', function($scope, $http) {
    var mealService = {};

    mealService.data = {};

    //Gets the list of nuclear weapons
    mealService.getMeals = function() {
        $http.get('http://dpd.info-maker.com/meals?public=1&include=user')
            .success(function(data) {
                mealService.data.meals = data;
            });

        return mealService.data;
    };

    return mealService;
});