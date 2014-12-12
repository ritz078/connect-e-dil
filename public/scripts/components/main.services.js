'use strict';

angular.module('valentinoApp').service('valinfo',['$http','$q',function($http,$q){
  var deferred=$q.defer();
  $http.get('/data/data.json').then(function(d){
    deferred.resolve(d);

  });
  this.getRules=function(){
    return deferred.promise;
  };

  $http.get('https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyCoJ6dFXpqs39y48isvRjv_yKpPsRtS_Uc&part=snippet,contentDetails,statistics,status')
    .success(function(e){
      console.log(e);
    });
}]);
