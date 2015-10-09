//app.controller('LoginCtrl', function($scope, $rootScope, $http) {

app.controller('LoginCtrl', ['$scope', '$rootScope', function($scope) {
    $scope.password = "234werwef";
    $scope.email = "sdfsdfsdf";
    $scope.login = function(data) {
        alert("login " + data.password);
    }
}]);

/*
app.controller('LoginCtrl', ['$scope', function($scope) {
    $scope.password = "234werwef";
    $scope.email = "sdfsdfsdf";
    

    $scope.login = function($scope, $http) {
        alert("login");
        if($scope.email){
            console.log($scope.email.length);
        }
        alert("login");
        var obj = new Object();
        obj.password = $scope.password;
        obj.username = $scope.email;
        $http({
            url: 'http://dpd.info-maker.com/users/login',
            method: "POST",
            data: obj,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {
                if (data.message)
                {
                    $scope.id = data.id;
                    $scope.uid = data.uid;
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
}]);

*/