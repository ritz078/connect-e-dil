'use strict';

var resolve = {
  delay: function($q, $timeout) {
    var delay = $q.defer();
    $timeout(delay.resolve, 50, false);
    return delay.promise;
  }
};

angular.module('valentinoApp')
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/rules', {
          templateUrl: '/views/rules.html',
          controller: 'RulesController',
          resolve:resolve
        })
        .when('/shout/:id',{
          templateUrl:'/views/shout.html',
          controller:'ShoutController',
          resolve:resolve
        });


    }]);

