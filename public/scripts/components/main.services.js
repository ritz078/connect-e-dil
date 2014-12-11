'use strict';

angular.module('valentinoApp').service('valinfo',['$http','$q',function($http,$q){
  var deferred=$q.defer();
  $http.get('/data/data.json').then(function(d){
    deferred.resolve(d);

  });
  this.getRules=function(){
    return deferred.promise;
  };
}]);
