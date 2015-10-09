  app.controller('mealListCtrl', function($scope, $timeout, $http) {
        $scope.items = [];
          dpd('meals').get('?include=user&public=1&$limit=' + _itemPerPage + '&$skip=' + _SkipPage, function(data, err) {
                  if (err) {
                     alert(err);}
                  if (data.length) {
                    $scope.items = data;}
                }); 
        $scope.load = function($done) {
          $timeout(function() {
            dpd('meals').get('?include=user&public=1&$limit=' + _itemPerPage + '&$skip=' + _SkipPage, function(data, err) {
              if (err) {
                 alert(err);}
              if (data.length) {
                $scope.items = data;}
            }); 
          }, 1000);
        };
      /*
        $scope.reset = function(){
          $scope.items.length = 0;
        }*/
      });        