'use strict';

var app = angular.module('valentinoApp');

app.directive('leanModal', function () {
  return {
    restrict: 'A',
    link: function (scope, elem, attr) {
      $(elem).leanModal(scope.$eval(attr.leanModal));
    }
  };
});



