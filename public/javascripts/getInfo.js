/**
 * Created by lakshmi on 9/9/15.
 */
angularBridge = {};
angular.module('myApp', []). controller('myCtrl', function($scope, $http){
   //$scope.test = "hello world"
    angularBridge.$demoScope = $scope;
    $scope.resumeObj = {};
    $scope.datalists = [];
    $scope.chartInfo = {};
    $scope.some={};


    function createChartInfo(data){
        console.log('data from createchartinfo*****',data);

        //chartInfo.chart.type = 'line';

        var chartInfo={
            chart: {
                type: 'line'
            },
            title: {
                text: 'Resumes Uploaded on week from 27 Jun to 30 Jun 2015  '
            },
            xAxis: {
                categories: ['27 Jun', '28 Jun', '29 Jun']
            },
            yAxis: {
                title: {
                    text: 'Number of resumes'
                }
            },
            series: [{
                name: 'Uploads',
                data: [13, 8, 6]
            }]
        };
        console.log('data from createchartinfo*****',chartInfo);

        return chartInfo;

    }

    $scope.getLastWeekResumes = function(){
        var date = new Date();
        console.log('from controller',new Date());
        $http.get('/resumes/w/'+ date).success(function(result){
            var results = result;
            console.log("===>",$scope.chartInfo);
            $scope.chartInfo = createChartInfo(result);

        })

    },
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
      }
  //  $scope.showData();
    })


angular.module('myApp').filter('paginate', function()
{
    return function(input, start)
    {
        start = +start;
        return input.slice(start);
    };
});