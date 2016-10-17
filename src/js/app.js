angular.module('zMotionProject', []).
controller('main', function ($scope, $http, $sce, $timeout) {
    $scope.svgArr = [];
    $scope.hideSvg = true;
    $scope.previewSvg = "";
    $scope.loadSvg = function (svgName) {
        request();
        request(svgName);
    }
    $scope.motion = null;

    var request = function (svgName) {
        var url = 'src/svg/' + (svgName ? svgName : '');
        $http({
          method: 'GET',
          url: url
        }).then(function successCallback(response) {
            if(svgName){
                $scope.previewSvg = $sce.trustAsHtml(response.data);
                initMotion();
            }else{
                $scope.svgArr = response.data;
            }
          }, function errorCallback(response) {
              console.log(response)
              console.log("Something went wrong, what a bummer")
          });
    }

    var initMotion = function () {
        $timeout(function(){
            var svg = document.querySelector('.preview svg');
            $scope.motion = new zMotion(svg,{
                duration    : '5s',
                delay       : 500,
                shuffle     : false,
                clearStroke : true,
                clearFill   : true,
                drawStroke  : true,
                drawFill    : false,
                terminus    : false,
                reverse     : false,
                easing      : "ease"
            });

            $scope.motion.clear();
            $timeout(function(){$scope.motion.draw(); $scope.hideSvg = false},50)
        },0);

    }

    request();
    request('tripadvisor.svg');


});
