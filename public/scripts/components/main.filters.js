'use strict';

var app=angular.module('valentinoApp');

app.filter('reverse', function() {
  return function(items) {
    if(items!==undefined){

      return items.slice().reverse();
    }

    return;
  };
});

app.filter('leaderBfilter', function() {
  return function( items, input) {
    var filtered = [];

    if(input === undefined || input === ''){
      return items;
    }

    function capitaliseFirstLetter(string)
    {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    angular.forEach(items, function(item) {

      if(item.name.indexOf(capitaliseFirstLetter(input)) === 0){
        filtered.push(item);
      }
    });

    return filtered;
  };
});
