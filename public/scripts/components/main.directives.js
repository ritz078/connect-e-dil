/**
 * Created by ritz078 on 10/12/14.
 */

'use strict';

angular.module('valentinoApp')

.directive('leanModal',function(){
  return{
    restrict:'A',
    link:function(scope,elem,attr){
      $(elem).leanModal(scope.$eval(attr.leanModal));
    }
  };
});
