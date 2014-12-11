
'use strict';

var app=angular.module('valentinoApp');

  app.controller('ValentinoController',['$scope','valinfo',function($scope,valinfo){


    var d=new Date();
    $scope.shouts=[{
      'name':'Chintapenta Subramaniam Pramod',
      'time':d,
      'data':'Lorem ipsum <br> https://www.google.com sit amet, consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error excepturi exercitationem facere fuga fugit iure minus omnis placeat porro quod sed, veniam voluptas voluptatibus voluptatum.'
    },
      {
        'id':'4566',
        'name':'Ritesh Kumar',
        'time':d,
        'data':'Lorem :) ipsum dolor sit amet https://channeli.in , consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error excepturi exercitationem facere fuga fugit iure minus omnis placeat porro quod sed, veniam voluptas voluptatibus voluptatum.'
      },
      {
        'id':'4566',
        'name':'Ritesh Kumar',
        'time':d,
        'data':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error excepturi exercitationem facere fuga fugit iure minus omnis placeat porro quod sed, veniam voluptas voluptatibus voluptatum.'
      },
      {
        'id':'4566',
        'name':'Ritesh Kumar',
        'time':d,
        'data':'Lorem ipsum dolor ^_^ sit amet, consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error excepturi exercitationem facere fuga fugit iure minus omnis placeat porro quod sed, veniam voluptas voluptatibus voluptatum.'
      },
      {
        'id':'4566',
        'name':'Ritesh Kumar',
        'time':d,
        'data':'Lorem ipsum \n dolor sit amet, consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error excepturi exercitationem facere fuga fugit iure minus omnis placeat porro quod sed, veniam voluptas voluptatibus voluptatum.'
      },
      {
        'id':'4566',
        'name':'Ritesh Kumar',
        'time':d,
        'data':'Lorem ipsum do\nlkjlkjlkjlkjlkjlkjlkjlkjlkjlkjorhgjhgkjhgkhgkjhgkjhgkjhgkjhgkjhgkjhgkjhg sit amet :* , consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error excepturi exercitationem facere fuga fugit iure minus omnis placeat porro quod sed, veniam voluptas voluptatibus voluptatum.'
      },
      {
        'id':'4567',
        'name':'Ritesh Kumar',
        'time':d,
        'data':'Lorem ipsum dolor sit <3 , consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error excepturi exercitationem facere fuga fugit iure minus omnis placeat porro quod sed, veniam voluptas voluptatibus voluptatumjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjh.'
      }];

    $scope.rules={};
    var valPromise=valinfo.getRules();
    valPromise.then(function(data){
      $scope.rules=data.data.rules;
    });


    $scope.user={
      'name':'Ritesh Kumar'
    };


    //Shout Submission
    $scope.submitShout=function(e){
      console.log(e.keyCode);
      if(e.keyCode!==13){return;}
      else if(e.keyCode===13 && !e.shiftKey){
        e.preventDefault();
        $scope.user.time=new Date();
        $scope.shouts.push($scope.user);
        $scope.user={
          'name':'Ritesh Kumar'
        };
      }



    };

    //transition effects
    $('#shoutInput').focus(function(){
      $(this).animate({height:'80px'});
    });

      $('#shoutInput').blur(function(){
        $(this).animate({height:'40px'});
      });



  }]);


  app.controller('RulesController',['$scope','valinfo',function($scope,valinfo){
    $scope.rules={};
    var valPromise=valinfo.getRules();
    valPromise.then(function(data){
      $scope.rules=data.data.rules;
    });
}]);

app.controller('ShoutController',['$scope',function($scope){
  var d =new Date();
  $scope.shout={
    'id':'4567',
    'name':'Ritesh Kumar',
    'time':d,
    'data':'Lorem ipsum https://www.google.com dolor sit <3 https://www.youtube.com/watch?v=gNmWybAyBHI , consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error excepturi exercitationem facere fuga fugit iure minus omnis placeat porro quod sed, veniam voluptas voluptatibus voluptatumjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjh.'
  };
}]);
