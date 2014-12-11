'use strict';

var app=angular.module('valentinoApp');

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
