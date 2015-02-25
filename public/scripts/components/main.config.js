/*global Chart*/

'use strict';

/**
 * This part contains all the routes that we are going to use in the app.
 * we have to make sure the backend serves the same index.html in all the routes.
 * In grunt this is achieved by using mod-rewrite module.It solves the bug that arises
 * after we refresh the page in some route other than '/' provided the HTML5 mode is set to true.
 * Currently its not true but is advisable to keep it true.
 */


var resolve = {
    delay: function($q, $timeout) {
        var delay = $q.defer();
        $timeout(delay.resolve, 50, false);
        return delay.promise;
    }
};

var app = angular.module('valentinoApp');

app.config(['$routeProvider',
    function($routeProvider) {
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


    }
]);

/**
 * The change of global settings for the graph used
 */

Chart.defaults.global.scaleLineColor = 'rgba(255,255,255,.1)';
Chart.defaults.global.scaleFontColor = 'rgba(255,255,255,0.8)';
Chart.defaults.global.scaleFontFamily = 'latoregular,sans-serif';
Chart.defaults.global.animationSteps = 150;
Chart.defaults.global.tooltipFillColor = 'rgba(131, 76, 196, 0.95)';
Chart.defaults.global.tooltipFontFamily = 'latoregular,sans-serif';
Chart.defaults.global.tooltipTitleFontFamily = 'lato-regular,sans-serif';
Chart.defaults.global.animationSteps = 30;
