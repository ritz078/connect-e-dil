'use strict';

angular.module('valentinoApp')
  .config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/rules', {
          templateUrl: 'views/rules.html',
          controller: 'rulesController'
        });

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
    }]);
