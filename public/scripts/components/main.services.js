'use strict';

var app = angular.module('valentinoApp');

app.service('dataRules', ['$http', '$q',
  function ($http, $q) {
    var deferred = $q.defer();
    $http.get('/data/data.json').then(function (d) {
      deferred.resolve(d);

    });
    this.getRules = function () {
      return deferred.promise;
    };
  }]);

app.service('dataLeaderboard',['$http','$q',
function($http,$q){
  var deferred=$q.defer();
  $http.get('/data/v-leaderboard.json')
    .success(function(d){
      deferred.resolve(d);
    });

  this.getLeaderboard=function(){
    return deferred.promise;
  };
}]);

app.service('dataShoutbox',['$http','$q',
  function($http,$q){
  var deferred=$q.defer();
    $http.get('/data/v-shout.json')
      .success(function(d){
        deferred.resolve(d);
      });

    this.getShoutbox=function(){
      return deferred.promise;
    };
}]);

// Create an AngularJS service called debounce
app.factory('debounce', ['$timeout','$q', function($timeout, $q) {
  // The service is actually this function, which we call with the func
  // that should be debounced and how long to wait in between calls
  return function debounce(func, wait, immediate) {
    var timeout;
    // Create a deferred object that will be resolved when we need to
    // actually call the func
    var deferred = $q.defer();
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if(!immediate) {
          deferred.resolve(func.apply(context, args));
          deferred = $q.defer();
        }
      };
      var callNow = immediate && !timeout;
      if ( timeout ) {
        $timeout.cancel(timeout);
      }
      timeout = $timeout(later, wait);
      if (callNow) {
        deferred.resolve(func.apply(context,args));
        deferred = $q.defer();
      }
      return deferred.promise;
    };
  };
}]);
