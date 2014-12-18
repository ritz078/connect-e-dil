'use strict';

var app = angular.module('valentinoApp');

app.controller('ValentinoController', ['$scope', 'dataLeaderboard', 'dataShoutbox',
  function ($scope, dataLeaderboard, dataShoutbox) {

    $scope.shouts = [];
    var promiseShoutbox = dataShoutbox.getShoutbox();
    promiseShoutbox.then(function (d) {
      $scope.shouts = d;
    });

    $scope.leaderboard = [];
    var promiseLeaderboard = dataLeaderboard.getLeaderboard();
    promiseLeaderboard.then(function (d) {
      $scope.leaderboard = d;

    });


    $scope.user = {
      'name': 'Ritesh Kumar'
    };


    //Shout Submission
    $scope.submitShout = function (e) {

      if (e.keyCode !== 13 && !($('mentio-menu').is(':visible'))) {
        return;
      }
      else if (e.keyCode === 13 && !e.shiftKey && !($('mentio-menu').is(':visible')) && $scope.user.data) {
        e.preventDefault();
        $scope.user.time = new Date();
        $scope.shouts.push($scope.user);
        $scope.user = {
          'name': 'Ritesh Kumar'
        };
      }


    };

    //transition effects
    $('#shoutInput').focus(function () {
      $(this).animate({height: '80px'});
    });

    $('#shoutInput').blur(function () {
      $(this).animate({height: '40px'});
    });

    $scope.people = [
      { label: 'Joe'},
      { label: 'Mike'},
      { label: 'Diane'},
      {label:'Ritesh'},
      {label:'Pulkit'},
      {label:'Punit'}
    ];


  }]);


app.controller('RulesController', ['$scope', 'dataRules', function ($scope, dataRules) {
  $scope.rules = {};
  var valPromise = dataRules.getRules();
  valPromise.then(function (data) {
    $scope.rules = data.data.rules;
  });
}]);

app.controller('ShoutController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {

  var shout = {
    'id': '4567',
    'name': 'Ritesh Kumar',
    'time': 'Fri Feb 06 1970 00:34:19 GMT+0000 (UTC)',
    'data': 'Lorem ipsum https://www.google.com dolor sit <3 https://www.youtube.com/watch?v=0fXlZ3vnQd0 , consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error'
  };

  String.prototype.truncate = function (n) {
    return this.substr(0, n - 1) + (this.length > n ? '...' : '');
  };

  /**
   * Extracting youtube video url
   * */

  var regex = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[?=&+%\w-]*/gi;

  var x = shout.data.match(regex);
  if (x) {
    shout.youtube = {};
    var y = x[0].split('=');
    shout.youtube.id = y[1];
    console.log(shout);

    $http.get('https://www.googleapis.com/youtube/v3/videos?id=' + shout.youtube.id + '&key=AIzaSyCoJ6dFXpqs39y48isvRjv_yKpPsRtS_Uc&part=snippet,contentDetails,statistics,status')
      .success(function (e) {
        shout.youtube.title = e.items[0].snippet.channelTitle;
        shout.youtube.desc = e.items[0].snippet.description.truncate(250);
        shout.youtube.videoUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + shout.youtube.id + '?autoplay=1&theme=light&rel=0');


      });


  }

  /**
   * Calculating Video Dimensions
   */
  var width = $('.center').width() - 100;
  var height = width * (315 / 560);
  $scope.videoDimensions = {
    'height': height,
    'width': width
  };

  /**
   Extracting image links
   **/

  var imgRegex = /((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi;
  var img = shout.data.match(imgRegex);
  if (img) {
    shout.imageUrl = img[0];
  }


  $scope.shout = shout;


  console.log(shout);


}]);

app.controller('UserController', ['$scope', '$http', '$routeParams',
  function ($scope, $http, $routeParams) {
  console.log($routeParams);

  $http.get('http://beta.json-generator.com/api/json/get/O_6cJ37').success(function (d) {
    $scope.user = d;
    console.log(d);
  });


    $scope.lineChart={
      labels:['8th', '9th', '10th', '11th', '12th', '13th', '14th'],
      series:['Red Roses', 'Yellow Roses'],
      data : [
        [5, 0, 1, 6, 5, 0],
        [8, 8, 0, 9, 6, 7, 0]
      ],
      onClick : function (points, evt) {
        console.log(points, evt);
      },
      options:{
        scaleGridLineColor : 'rgba(255,255,255,.05)',
        bezierCurve : false
      }
    };

    $scope.pieChart={
      labels:['Bande','Bandiyan'],
      data:[3,4],
      'colors':[{
        fillColor: 'rgba(255,255,255,0.3)',
        strokeColor: 'rgba(255,255,255,0.3)',
        pointColor: 'rgba(255,255,255,0.3)',
        pointStrokeColor: 'rgba(255,255,255,0.3)',
        pointHighlightFill: 'rgba(255,255,255,0.3)',
        pointHighlightStroke: 'rgba(255,255,255,0.3)'
      },{
        fillColor: 'rgba(255,255,255,0.7)',
        strokeColor: 'rgba(255,255,255,0.7)',
        pointColor: 'rgba(255,255,255,0.7)',
        pointStrokeColor: 'rgba(255,255,255,0.7)',
        pointHighlightFill: 'rgba(255,255,255,0.7)',
        pointHighlightStroke: 'rgba(255,255,255,0.7)'
      }],
      options:{
        segmentShowStroke:false
      }

    };

}]);


app.controller('LeaderboardController',['$scope','$http',
  function($scope,$http){
$http.get('/data/v-leaderboard.json').success(function(d){
  console.log(d);
  $scope.users=d;
});
}]);
