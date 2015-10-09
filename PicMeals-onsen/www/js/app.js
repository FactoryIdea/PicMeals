var app = angular.module('app', ['onsen','dpd']);

var _UserID = "9b9de3e0a62da943";

   /*    
    app.controller('mealListController', function($scope, $timeout, $http) {
        $scope.items = [];
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
        $scope.reset = function(){
          $scope.items.length = 0;
        }
      });        
  */      
        
        /*
    // Configuration:
    app.value('dpdConfig',['meals']);
    // or
    app.value('dpdConfig', { 
        collections: ['meals'], 
        serverRoot: 'http://dpd.info-maker.com/', // optional, defaults to same server
        socketOptions: { reconnectionDelayMax: 3000 }, // optional socket io additional configuration
        useSocketIo: true, // optional, defaults to false
        noCache: true // optional, defaults to false (false means that caching is enabled, true means it disabled)
    });           
       //ons.bootstrap(); 
       */