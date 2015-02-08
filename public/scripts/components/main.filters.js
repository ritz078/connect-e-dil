'use strict';

var app = angular.module('valentinoApp');

app.filter('reverse', function () {
  return function (items) {
    if (items !== undefined) {

      return items.slice().reverse();
    }

    return;
  };
});

app.filter('leaderBfilter', function () {
  return function (items, input) {
    var filtered = [];

    if (input === undefined || input === '') {
      return items;
    }

    function capitaliseFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    angular.forEach(items, function (item) {

      if (item.name.indexOf(capitaliseFirstLetter(input)) === 0) {
        filtered.push(item);
      }
    });

    return filtered;
  };
});

app.filter('profanity', function () {
  var words = ['sex', 'fuck','chod'];
  return function (input) {
    if(input){
      angular.forEach(words, function (word) {
        var x = word;
        var len = word.length;
        String.prototype.repeat = function (num) {
          return new Array(num + 1).join(this);
        };
        var re = new RegExp(x, 'g');
        input = input.replace(re, '*'.repeat(len));
      });
      return input;
    }

  };
});

app.filter('numberSuffix', function () {
  return function (input) {
    if (input === 1) {
      return input + 'st';
    }
    else if (input === 2) {
      return input + 'nd';
    }
    else if (input === 3) {
      return input + 'rd';
    }
    else {
      return input + 'th';
    }
  };
});

