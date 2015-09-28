/**
 * Created by lakshmi on 9/9/15.
 */

angular.module('myApp', []). controller('myCtrl', function($scope, $http){
    $scope.resumeObj = {};
    $scope.datalists = [];

    $scope.url = window.location.href;
    console.log($scope.url);
    var id = $scope.url.split('/')[4];
    console.log(id);


    $scope.showData = function( ) {
        $scope.curPage = 0;
        $scope.pageSize = 3;

        $http.get('/resumes/').success(function(result){
            $scope.datalists = result;
            console.log("===>",$scope.datalists);
            $scope.numberOfPages = function() {
                return Math.ceil($scope.datalists.length / $scope.pageSize);
            };
            console.log($scope.numberOfPages());
        })
    };
    $scope.statusCodes = function(batchID){
        console.log('*************batch from status code',batchID);

        $http.get('/status/'+$scope.batchID).success(function(result){
            $scope.datalists = result;
            // console.log("status datalists",$scope.datalists);
            console.log("===>",$scope.datalists);
            $scope.numberOfPages = function() {
                return Math.ceil($scope.datalists.length / $scope.pageSize);
            };
            //  console.log($scope.numberOfPages());
        })
    };

    $scope.skillSearch = function(skill){
        console.log(skill);
        // console.log($scope.skill)
        $http.get('/skills/'+$scope.skill).success(function(result){
            console.log('in')
            console.log('results*******',result);
            $scope.datalists = result;
            // console.log("status datalists",$scope.datalists);
            console.log("===>",$scope.datalists);
            $scope.numberOfPages = function() {
                return Math.ceil($scope.datalists.length / $scope.pageSize);
            };
            //  console.log($scope.numberOfPages());
        })
    };
    $scope.criterion = 'creationDate';
    $scope.sort = function (num) {
        switch (num) {
            case 1:  $scope.criterion = '_id';
                break;
            case 2:  $scope.criterion = 'name';
                break;
            case 3:  $scope.criterion = 'email';
                break;
            case 4:  $scope.criterion = 'phone';
                break;
            case 5:  $scope.criterion = 'uuid';
                break;
            case 6:  $scope.criterion = 'status';
                break;
            case 7:  $scope.criterion = '-creationDate';
                break;
            case 8:  $scope.criterion = 'processDate';
                break;
        }


    };
});


angular.module('myApp').filter('paginate', function()
{
    return function(input, start)
    {
        start = +start;
        return input.slice(start);
    };
});