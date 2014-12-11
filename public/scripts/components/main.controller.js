
'use strict';

angular.module('valentinoApp')

  .controller('ValentinoController',['$scope','valinfo',function($scope,valinfo){


    var d=new Date();
    $scope.shout=[{
      'name':'Chintapenta Subramaniam Pramod',
      'time':d,
      'data':'Lorem ipsum https://www.google.com sit amet, consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error excepturi exercitationem facere fuga fugit iure minus omnis placeat porro quod sed, veniam voluptas voluptatibus voluptatum.'
    },
      {
        'name':'Ritesh Kumar',
        'time':d,
        'data':'Lorem :) ipsum dolor sit amet https://channeli.in , consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error excepturi exercitationem facere fuga fugit iure minus omnis placeat porro quod sed, veniam voluptas voluptatibus voluptatum.'
      },
      {
        'name':'Ritesh Kumar',
        'time':d,
        'data':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error excepturi exercitationem facere fuga fugit iure minus omnis placeat porro quod sed, veniam voluptas voluptatibus voluptatum.'
      },
      {
        'name':'Ritesh Kumar',
        'time':d,
        'data':'Lorem ipsum dolor ^_^ sit amet, consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error excepturi exercitationem facere fuga fugit iure minus omnis placeat porro quod sed, veniam voluptas voluptatibus voluptatum.'
      },
      {
        'name':'Ritesh Kumar',
        'time':d,
        'data':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error excepturi exercitationem facere fuga fugit iure minus omnis placeat porro quod sed, veniam voluptas voluptatibus voluptatum.'
      },
      {
        'name':'Ritesh Kumar',
        'time':d,
        'data':'Lorem ipsum dolkjlkjlkjlkjlkjlkjlkjlkjlkjlkjorhgjhgkjhgkhgkjhgkjhgkjhgkjhgkjhgkjhgkjhg sit amet :* , consectetur adipisicing elit. Accusamus adipisci culpa debitis, distinctio error excepturi exercitationem facere fuga fugit iure minus omnis placeat porro quod sed, veniam voluptas voluptatibus voluptatum.'
      },
      {
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
      e.preventDefault();
      $scope.user.time=new Date();
      $scope.shout.push($scope.user);
      $scope.user={
        'name':'Ritesh Kumar'
      };


    };

    //transition effects
    $('#shoutInput').focus(function(){
      $(this).animate({height:'80px'});
    });

      $('#shoutInput').blur(function(){
        $(this).animate({height:'40px'});
      });



  }]);
