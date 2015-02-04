'use strict';

var app = angular.module('valentinoApp');

app.controller('ValentinoController', ['ngNotify', '$scope', '$http', 'dataLeaderboard', 'dataShoutbox','mySocket',
  function (ngNotify, $scope, $http, dataLeaderboard, dataShoutbox,mySocket) {

    $scope.shouts = [];
    var promiseShoutbox = dataShoutbox.getShoutbox(1,15);
    promiseShoutbox.then(function (d) {
      $scope.shouts = d;
    });

    $scope.clb = [];
    var promiseLeaderboard = dataLeaderboard.getCombinedLeaderboard();
    promiseLeaderboard.then(function (d) {
      $scope.clb = d;

    });


    $scope.user = {
      'name': 'Ritesh Kumar',
      'enrolmentNo': '11115078'
    };


    //Shout Submission
    $scope.submitShout = function (e) {

      if (e.keyCode !== 13 && !($('mentio-menu').is(':visible'))) {
        return;
      }
      else if (e.keyCode === 13 && !e.shiftKey && !($('mentio-menu').is(':visible')) && $scope.user.content) {
        e.preventDefault();
        $scope.user.time = new Date();
        $scope.shouts.push($scope.user);
        mySocket.emit('chat message',$scope.user.content);
        $scope.user = {
          'name': 'Ritesh Kumar'
        };
        console.log($scope.user.content);

        $scope.user.content='';
        mySocket.on('rfh', function(m){
          console.log(m);
          ngNotify.set(m,{
            'position':'top',
            'type':'error'
          });
        });
      }
mySocket.on('chat message',function(d){
  console.log(d);
});

    };

    mySocket

    //shout infinitescroll
    $scope.loadShout = function (s) {
      var addShoutPromise=dataShoutbox.getShoutbox(s,5);
      addShoutPromise.then(function(d){
$scope.shouts=$scope.shouts.concat(d);
      })
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

app.controller('HomeController', ['$scope', 'ngNotify', 'messages', 'dashboardData', function ($scope, ngNotify, messages, dashboardData) {

  $scope.message = {
    'anon': true
  };
  console.log($scope.message);
  $scope.sendMessage = function () {
    if ($scope.selectedReceiver.originalObject) {
      $scope.message.to = $scope.selectedReceiver.originalObject.enrolmentNo;
      console.log($scope.message);
      if ($scope.message.anon && $scope.message.message) {
        ngNotify.set('Anonymous ? Really ? Why ? Why ? Why ?', 'error');
      }
      else {
        var sendMsgPromise = messages.sendMsg($scope.message);
        sendMsgPromise.then(function (d) {
          console.log(d);
        });
      }
    }
  };

  var dashPromise = dashboardData.getdashData();
  dashPromise.then(function (d) {
    console.log(d);
    if(!d.error_code){
      $scope.dash = d;
    }
    else{
      ngNotify.set('Alert',{
        'position':'top',
        'type':'error'
      });
    }

  });
}]);


app.controller('RulesController', ['$scope', 'dataRules', function ($scope, dataRules) {
  $scope.rules = {};
  var valPromise = dataRules.getRules();
  valPromise.then(function (data) {
    $scope.rules = data.data.rules;
  });
}]);

app.controller('ShoutController', ['$scope', '$http', '$sce', 'embed', '$routeParams', 'dataSingleShout',
  function ($scope, $http, $sce, embed, $routeParams, dataSingleShout) {
    console.log($routeParams.id);

    var shPromise = dataSingleShout.getShoutData($routeParams.id);
    shPromise.then(function (d) {
      $scope.shout = d;

      console.log(d);

      String.prototype.truncate = function (n) {
        return this.substr(0, n - 1) + (this.length > n ? '...' : '');
      };

      /**
       * Extracting youtube video url
       * */
      $scope.shout.youtube = {};

      var embedPromise = embed.getVideo($scope.shout.content);
      embedPromise.then(function (e) {
        console.log(e);
        $scope.shout.youtube.id = e.items[0].id;
        $scope.shout.youtube.title = e.items[0].snippet.channelTitle;
        $scope.shout.youtube.desc = e.items[0].snippet.description.truncate(250);
        $scope.shout.youtube.videoUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + e.items[0].id + '?autoplay=1&theme=light&rel=0');
      });

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
      var img = $scope.shout.content.match(imgRegex);
      if (img) {
        $scope.shout.imageUrl = img[0];
      }

      console.log($scope.shout);

    });


  }]);

app.controller('UserController', ['$scope', '$http', '$routeParams', 'dataUser',
  function ($scope, $http, $routeParams, dataUser) {

    var promise = dataUser.getUser($routeParams.enrolmentNo);
    promise.then(function (d) {
      console.log(d);
      $scope.wall = d;
      $scope.pieChart1 = {
        labels: ['Bande', 'Bandiyan'],
        data: [d.male_roses, d.female_roses]
      };

      $scope.pieChart2 = {
        labels: ['Red Roses', 'Yellow Roses'],
        data: [d.red_roses, d.yellow_roses]
      };

      var daily={
        'red_roses':[0,0,0,0,0,0,0,0],
        'yellow_roses':[0,0,0,0,0,0,0,0]
      };

      angular.forEach(d.rr_daywise,function(x){
        daily.red_roses[x.day-1]= x.count;
      });

      angular.forEach(d.yr_daywise,function(x){
        daily.yellow_roses[x.day-1]= x.count;
        console.log(x);
      });

      console.log(daily);

      $scope.lineChart = {
        labels: ['8th', '9th', '10th', '11th', '12th', '13th', '14th','15th'],
        series: ['Red Roses', 'Yellow Roses'],
        data: [
          daily.red_roses, daily.yellow_roses
        ],
        options: {
          scaleGridLineColor: 'rgba(255,255,255,.05)',
          bezierCurve: false
        }
      };


    });

    $scope.pieChart = {
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


app.controller('LeaderboardController', ['$scope', '$http','dataLeaderboard',
  function ($scope, $http, dataLeaderboard) {
    var promise=dataLeaderboard.getLeaderboard(1,30,'M');
    promise.then(function(d){
      $scope.users=d;
    })

    /**
     * TODO:search optimizations
     */

    $scope.addtoLeaderboard = function (l) {
      console.log(l);
      var add_promise=dataLeaderboard.getLeaderboard(l,5,'M');
      add_promise.then(function(ds){
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

app.controller('LoveguruController', ['$scope', function ($scope) {

}]);
