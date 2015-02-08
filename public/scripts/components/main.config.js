/*global Chart*/

'use strict';


var resolve = {
  delay: function ($q, $timeout) {
    var delay = $q.defer();
    $timeout(delay.resolve, 50, false);
    return delay.promise;
  }
};

var app = angular.module('valentinoApp');

app.run(['$http','$cookies',function($http,$cookies){
$http.defaults.headers.post['X-CSRFToken'] = $cookies['csrftoken'];
}]);
app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../views/home.html',
        controller: 'HomeController',
        resolve: resolve
      })
      .when('/rules', {
        templateUrl: '../views/rules.html',
        controller: 'RulesController',
        resolve: resolve
      })
      .when('/shout/:id', {
        templateUrl: '../views/shout.html',
        controller: 'ShoutController',
        resolve: resolve
      })
      .when('/user/:enrolmentNo', {
        templateUrl: '../views/user.html',
        controller: 'UserController',
        resolve: resolve
      })
      .when('/leaderboard', {
        templateUrl: '../views/leaderboard.html',
        controller: 'LeaderboardController',
        resolve: resolve
      })
      .otherwise({
        redirectTo: '/'
      });


  }]);

Chart.defaults.global.scaleLineColor = 'rgba(255,255,255,.1)';
Chart.defaults.global.scaleFontColor = 'rgba(255,255,255,0.8)';
Chart.defaults.global.scaleFontFamily = 'latoregular,sans-serif';
Chart.defaults.global.animationSteps = 150;
Chart.defaults.global.tooltipFillColor = 'rgba(131, 76, 196, 0.95)';
Chart.defaults.global.tooltipFontFamily = 'latoregular,sans-serif';
Chart.defaults.global.tooltipTitleFontFamily = 'lato-regular,sans-serif';
Chart.defaults.global.animationSteps=30;

