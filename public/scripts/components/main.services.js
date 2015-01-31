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

app.service('dataLeaderboard', ['$http', '$q',
  function ($http, $q) {
    var deferred = $q.defer();
    $http.get('/data/v-leaderboard.json')
      .success(function (d) {
        deferred.resolve(d);
      });

    this.getLeaderboard = function () {
      return deferred.promise;
    };
  }]);

app.service('dataShoutbox', ['$http', '$q',
  function ($http, $q) {
    var deferred = $q.defer();
    $http.get('http://172.25.55.147:3000/messages/1/10')
      .success(function (d) {
        console.log(d);
        deferred.resolve(d);
      });

    this.getShoutbox = function () {
      return deferred.promise;
    };
  }]);

app.service('dataSingleShout',['$http','$q',function($http,$q){
var deferred;
  this.getShoutData=function(id){
    deferred=$q.defer();
    $http.get('http://172.25.55.147:3000/message/'+id).success(function(d){
      deferred.resolve(d);
      console.log(d);
    });
    return deferred.promise;
  }
}])

app.service('embed', ['$http', '$q',
  function ($http, $q) {
    this.getVideo = function (input) {
      var deferred = $q.defer();
      var regex = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[?=&+%\w-]*/gi;
      var x = input.match(regex);
      String.prototype.truncate = function (n) {
        return this.substr(0, n - 1) + (this.length > n ? '...' : '');
      };
      if (x) {
        var y = x[0].split('=');
        $http.get('https://www.googleapis.com/youtube/v3/videos?id=' + y[1] + '&key=AIzaSyCoJ6dFXpqs39y48isvRjv_yKpPsRtS_Uc&part=snippet,contentDetails,statistics,status')
          .success(function (e) {
            deferred.resolve(e);
          });

      }

      return deferred.promise;
    };
  }]);

app.service('messages', ['$http', '$q', function ($http, $q) {
  var deferredSendMsg = $q.defer();
  this.sendMsg = function (d) {
    $http.post('abc', d).success(function (d) {
      deferredSendMsg.resolve(d);
    })
      .error(function (d) {
        deferredSendMsg.resolve(d);
      });
    return deferredSendMsg.promise;
  };
}]);

app.service('dataUser', ['$http', '$q', function ($http, $q) {
  var deferred = $q.defer();
  this.getUser = function (enr) {
    $http.get('/data/v-user.json?enr=' + enr).success(function (d) {
      deferred.resolve(d);
    });
    return deferred.promise;
  };
}]);

app.service('dashboardData',['$http','$q',function($http,$q){
  var deferred=$q.defer();
  this.getdashData=function(){
    $http.get('/data/dashboard.json').success(function(d){
      deferred.resolve(d);
    });
    return deferred.promise;
  };
}]);


