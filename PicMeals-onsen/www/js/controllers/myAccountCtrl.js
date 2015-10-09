app.controller('MyAccountCtrl', function($scope, $http) {
  $scope.userid = _UserID;
  $scope.account = [];
  $http.get('http://dpd.info-maker.com/users?id=' +  _UserID)
       .then(function(res){
          $scope.account = res.data; 
        });
  $scope.following = [];
  $scope.totFollowing = 0;  
  $scope.followers = [];   
  $scope.totFollowers = 0;    
  // Open Following

  $http.get('http://dpd.info-maker.com/followers?include=following&user=' +  _UserID)
       .then(function(res){
          $scope.totFollowing = res.data.length;
          $scope.following = res.data;   
        });
  // Open Followers
  $http.get('http://dpd.info-maker.com/followers?include=followers&userFollowing=' +  _UserID)
       .then(function(res){
          $scope.totFollowers = res.data.length;
          $scope.followers = res.data;   
        }); 
  $scope.followThisUser = function ($scope) {
        alert("click ok");
        var obj = new Object();
        obj.user = _UserID;
        obj.userFollowing = _PublisherRefID;
        $http({
            url: 'http://dpd.info-maker.com/followers',
            method: "POST",
            data: obj,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {
                if (data.message)
                {
                    $scope.btnFollow = "Follow";
                    //$('#icoFollow').addClass("glyphicon-plus-sign").removeClass("glyphicon-ok");
                } else
                {
                    $scope.btnFollow = "Following";
                    //$('#icoFollow').removeClass("glyphicon-plus-sign").addClass("glyphicon-ok");
                }
            }).error(function (data, status, headers, config) {
                $scope.status = status;
            });    

    }  
});
