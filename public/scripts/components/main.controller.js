'use strict';

var app = angular.module('valentinoApp');

app.controller('ValentinoController', ['ngNotify', '$scope', '$http', 'dataLeaderboard', 'dataShoutbox',
  function (ngNotify, $scope, $http, dataLeaderboard, dataShoutbox) {

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

    //shout infinitescroll
    $scope.loadShout = function () {
      $http.get('http://beta.json-generator.com/api/json/get/FR1rX3L')
        .success(function (ds) {
          angular.forEach(ds, function (d) {
            $scope.shouts.push(d);
          });
        });
      ngNotify.set('Woho', 'success');
    };

    //transition effects
    $('#shoutInput').focus(function () {
      $(this).animate({height: '80px'});
    });

    $('#shoutInput').blur(function () {
      $(this).animate({height: '40px'});
    });

    $scope.people = [
      {label: 'Joe'},
      {label: 'Mike'},
      {label: 'Diane'},
      {label: 'Ritesh'},
      {label: 'Pulkit'},
      {label: 'Punit'}
    ];


  }]);

app.controller('HomeController', ['$scope','ngNotify','messages', function ($scope,ngNotify,messages) {

  $scope.message = {
    'anon':true
  };
  console.log($scope.message);
  $scope.sendMessage = function () {
    if ($scope.selectedReceiver.originalObject) {
      $scope.message.to = $scope.selectedReceiver.originalObject.enrolmentNo;
      console.log($scope.message);
      if($scope.message.anon && $scope.message.message){
        ngNotify.set('Anonymous ? Really ? Why ? Why ? Why ?','error');
      }
      else{
        var sendMsgPromise=messages.sendMsg($scope.message);
        sendMsgPromise.then(function(d){
console.log(d);
        });
      }
    }
  };
}]);


app.controller('RulesController', ['$scope', 'dataRules', function ($scope, dataRules) {
  $scope.rules = {};
  var valPromise = dataRules.getRules();
  valPromise.then(function (data) {
    $scope.rules = data.data.rules;
  });
}]);

app.controller('ShoutController', ['$scope', '$http', '$sce', 'embed', function ($scope, $http, $sce, embed) {

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
  shout.youtube = {};

  var embedPromise = embed.getVideo(shout.data);
  embedPromise.then(function (e) {
    console.log(e);
    shout.youtube.id = e.items[0].id;
    shout.youtube.title = e.items[0].snippet.channelTitle;
    shout.youtube.desc = e.items[0].snippet.description.truncate(250);
    shout.youtube.videoUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + e.items[0].id + '?autoplay=1&theme=light&rel=0');
  });
  console.log(embedPromise);

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

app.controller('UserController', ['$scope', '$http', '$routeParams','dataUser',
  function ($scope, $http, $routeParams,dataUser) {

    console.log($routeParams);

    var promise=dataUser.getUser($routeParams.enrolmentNo);
    promise.then(function(d){
      console.log(d);
      $scope.user=d;
      $scope.pieChart1 = {
        labels: ['Bande', 'Bandiyan'],
        data: [d.rosesReceived.fromMale, d.rosesReceived.fromFemale]
      };

      $scope.pieChart2 = {
        labels: ['Red Roses', 'Yellow Roses'],
        data: [d.rosesReceived.r, d.rosesReceived.y]
      };

      $scope.lineChart = {
        labels: ['8th', '9th', '10th', '11th', '12th', '13th', '14th'],
        series: ['Red Roses', 'Yellow Roses'],
        data: [
          d.rosesReceived.daily[0], d.rosesReceived.daily[1]
        ],
        options: {
          scaleGridLineColor: 'rgba(255,255,255,.05)',
          bezierCurve: false
        }
      };


    });

    $scope.pieChart={
      'colors': [{
        fillColor: 'rgba(255,255,255,0.3)',
        strokeColor: 'rgba(255,255,255,0.3)',
        pointColor: 'rgba(255,255,255,0.3)',
        pointStrokeColor: 'rgba(255,255,255,0.3)',
        pointHighlightFill: 'rgba(255,255,255,0.3)',
        pointHighlightStroke: 'rgba(255,255,255,0.3)'
      }, {
        fillColor: 'rgba(255,255,255,0.7)',
        strokeColor: 'rgba(255,255,255,0.7)',
        pointColor: 'rgba(255,255,255,0.7)',
        pointStrokeColor: 'rgba(255,255,255,0.7)',
        pointHighlightFill: 'rgba(255,255,255,0.7)',
        pointHighlightStroke: 'rgba(255,255,255,0.7)'
      }],
      options: {
        segmentShowStroke: false
      }
    };






  }]);


app.controller('LeaderboardController', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('/data/v-leaderboard.json').success(function (d) {
      console.log(d);
      $scope.users = d;
    });

    /**
     * TODO:search optimizations
     */

    $scope.addtoLeaderboard = function () {
      $http.get('http://beta.json-generator.com/api/json/get/AG36ZZQ')
        .success(function (ds) {
          angular.forEach(ds, function (d) {
            $scope.users.push(d);
          });
        });

    };

    $scope.selectedGender = {
      'male': false,
      'female': false,
      'getGender': function () {
        if (this.male && !this.female) {
          return 'Male';
        }
        else if (this.female && !this.male) {
          return 'Female';
        }
        else {
          return 'All';
        }
      }
    };


  }]);
