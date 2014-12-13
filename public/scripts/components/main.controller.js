'use strict';

var app = angular.module('valentinoApp');

app.controller('ValentinoController', ['$scope', 'valinfo', function ($scope, valinfo) {


  var d = new Date();
  $scope.shouts = [{
    'name': 'Chintapenta Subramaniam Pramod',
    'time': d,
    'data': 'Lorem ipsum <br> https://www.google.com sit amet, consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error excepturi exercitationem facere fuga fugit iure minus omnis placeat porro quod sed, veniam voluptas voluptatibus voluptatum.'
  },
    {
      'id': '4566',
      'name': 'Ritesh Kumar',
      'time': d,
      'data': 'Lorem :) ipsum dolor sit amet https://channeli.in , consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error excepturi exercitationem facere fuga fugit iure minus omnis placeat porro quod sed, veniam voluptas voluptatibus voluptatum.'
    },
    {
      'id': '4566',
      'name': 'Ritesh Kumar',
      'time': d,
      'data': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error excepturi exercitationem facere fuga fugit iure minus omnis placeat porro quod sed, veniam voluptas voluptatibus voluptatum.'
    },
    {
      'id': '4566',
      'name': 'Ritesh Kumar',
      'time': d,
      'data': 'Lorem ipsum dolor ^_^ sit amet, consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error excepturi exercitationem facere fuga fugit iure minus omnis placeat porro quod sed, veniam voluptas voluptatibus voluptatum.'
    },
    {
      'id': '4566',
      'name': 'Ritesh Kumar',
      'time': d,
      'data': 'Lorem ipsum \n dolor sit amet, consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error excepturi exercitationem facere fuga fugit iure minus omnis placeat porro quod sed, veniam voluptas voluptatibus voluptatum.'
    },
    {
      'id': '4566',
      'name': 'Ritesh Kumar',
      'time': d,
      'data': 'Lorem ipsum do\nlkjlkjlkjlkjlkjlkjlkjlkjlkjlkjorhgjhgkjhgkhgkjhgkjhgkjhgkjhgkjhgkjhgkjhg sit amet :* , consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error excepturi exercitationem facere fuga fugit iure minus omnis placeat porro quod sed, veniam voluptas voluptatibus voluptatum.'
    },
    {
      'id': '4567',
      'name': 'Ritesh Kumar',
      'time': d,
      'data': 'Lorem ipsum dolor sit <3 , consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error excepturi exercitationem facere fuga fugit iure minus omnis placeat porro quod sed, veniam voluptas voluptatibus voluptatumjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjh.'
    }];

  $scope.rules = {};
  var valPromise = valinfo.getRules();
  valPromise.then(function (data) {
    $scope.rules = data.data.rules;
  });


  $scope.user = {
    'name': 'Ritesh Kumar'
  };


  //Shout Submission
  $scope.submitShout = function (e) {
    console.log(e.keyCode);
    if (e.keyCode !== 13) {
      return;
    }
    else if (e.keyCode === 13 && !e.shiftKey) {
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


}]);


app.controller('RulesController', ['$scope', 'valinfo', function ($scope, valinfo) {
  $scope.rules = {};
  var valPromise = valinfo.getRules();
  valPromise.then(function (data) {
    $scope.rules = data.data.rules;
  });
}]);

app.controller('ShoutController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {

  var d = new Date();
  var shout = {
    'id': '4567',
    'name': 'Ritesh Kumar',
    'time': d,
    'data': 'Lorem https://www.google.co.in/images/srpr/logo11w.png ipsum https://www.google.com dolor sit <3 https://www.youtube.com/watch?v=gNmWybAyBHI , consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error'
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
        shout.youtube.desc = e.items[0].snippet.description;
        shout.youtube.videoUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + shout.youtube.id);


      });


  }

  /**
   * Calculating Video Dimensions
   */
  var width=$('.center').width()-100;
  var height=width*(315/560);
  $scope.videoDimensions={
    'height':height,
    'width':width
  };

  /*
  Extracting image links
   */

  var imgRegex = /((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi;
  var img=shout.data.match(imgRegex);
  shout.imageUrl=img[0];


  $scope.shout = shout;



  console.log(shout);



}]);
