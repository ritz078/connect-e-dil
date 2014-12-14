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
  $http.get('http://beta.json-generator.com/api/json/get/B1ewljb')
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
    $http.get('http://beta.json-generator.com/api/json/get/K0qt6bB')
      .success(function(d){
        deferred.resolve(d);
      });

    this.getShoutbox=function(){
      return deferred.promise;
    };
}]);
