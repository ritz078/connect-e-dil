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


    }])

.config(['enhanceTextFilterProvider', function (enhanceTextFilterProvider) {
    var x=(((angular.element('html').width())/12)*6)-40;
  enhanceTextFilterProvider.setOptions({
    cache: true,  // stores replaced text so angular update does not slow down
    newLineToBr: false,  // replaces \n with <br/>
    embedLinks: true,  // replaces links with Html links
    embeddedLinkTarget: '_blank',  // sets the target of all replaced links
    embedImages: true,  // replaces links to images with Html images
    embeddedImagesHeight: undefined,  // if given will be used to set height of embedded images
    embeddedImagesWidth: x,  // if given will be used to set width of embedded images
    embedVideos: true,  // replaces links to videos with Html videos
    embeddedVideosHeight: undefined,  // if given will be used to set height of embedded videos
    embeddedVideosWidth: undefined,  // if given will be used to set width of embedded videos
    embedYoutube: true,  // replaces links to youtube videos with iframed youtube videos
    embeddedYoutubeHeight: ((x/4)*2.5)/2,  // height of youtube video
    embeddedYoutubeWidth:x/2,  // width of youtube video
    smilies: {  // key = smilie, value = path to smilie
      '&lt;3': '&#xe604',
      ';)': '&#xe610',
      ':)':'&#xe60a',
      ':D':'&#xe608',
      ':(':'&#xe60e',
      ':/':'&#xe620',
      ':P':'&#xe60c',
      '3:)':'&#xe618',
      '(^)':'&#xe607',
      ':o':'&#xe61a',
      '-_-':'&#xe61e',
      '(y)':'&#xe606',
      ':*':'&#x604',
      '&lt;/3':'&#xe605',
      '^_^':'&#xe612',
      '8-)':'&#xe614',
      '8|':'&#xe614',
      ':S':'&#xe61c',
      ':s':'&#xe61c'

    }
  });
}]);
