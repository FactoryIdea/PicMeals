     var picApp = ons.bootstrap('picMealsApp',['onsen']);

      picApp.controller('picMealsController', function($scope){
         
          ons.ready(function() {
             $scope.isLoginHidden=false;
             $scope.isRegisterHidden=true;
             $scope.isMainHidden=true;
             $scope.isFriendHidden =true;
             $scope.isProfileHidden = true;
             $scope.isDetailHidden =true;
             $scope.isSettingsHidden =true;
              
        });
          
        $scope.showLogin = function(){
              $scope.isLoginHidden=false;
             $scope.isRegisterHidden=true;
             $scope.isMainHidden=true;
             $scope.isFriendHidden =true;
             $scope.isProfileHidden = true;
             $scope.isDetailHidden =true;
             $scope.isSettingsHidden =true;
          };
        
        $scope.showRegister = function(){
              $scope.isLoginHidden=true;
             $scope.isRegisterHidden=false;
             $scope.isMainHidden=true;
             $scope.isFriendHidden =true;
             $scope.isProfileHidden = true;
             $scope.isDetailHidden =true;
             $scope.isSettingsHidden =true;
          };
       
      $scope.showMain = function(){
              $scope.isLoginHidden=true;
             $scope.isRegisterHidden=true;
             $scope.isMainHidden=false;
             $scope.isFriendHidden =true;
             $scope.isProfileHidden = true;
             $scope.isDetailHidden =true;
             $scope.isSettingsHidden =true;
          };
      
       $scope.showFriend = function(){
              $scope.isLoginHidden=true;
             $scope.isRegisterHidden=true;
             $scope.isMainHidden=true;
             $scope.isFriendHidden =false;
             $scope.isProfileHidden = true;
             $scope.isDetailHidden =true;
             $scope.isSettingsHidden =true;
          };
       
        $scope.showProfile = function(){
              $scope.isLoginHidden=true;
             $scope.isRegisterHidden=true;
             $scope.isMainHidden=true;
             $scope.isFriendHidden =true;
             $scope.isProfileHidden = false;
             $scope.isDetailHidden =true;
             $scope.isSettingsHidden =true;
          };
         $scope.showDetail = function(){
              $scope.isLoginHidden=true;
             $scope.isRegisterHidden=true;
             $scope.isMainHidden=true;
             $scope.isFriendHidden =true;
             $scope.isProfileHidden = true;
             $scope.isDetailHidden =false;
             $scope.isSettingsHidden =true;
          };
          $scope.showSettings = function(){
              $scope.isLoginHidden=true;
             $scope.isRegisterHidden=true;
             $scope.isMainHidden=true;
             $scope.isFriendHidden =true;
             $scope.isProfileHidden = true;
             $scope.isDetailHidden =true;
             $scope.isSettingsHidden =false;
          };
      });