'use strict';

var app = angular.module('valentinoApp');

app.service('dataRules', ['$http', '$q',
    function($http, $q) {
        var deferred = $q.defer();
        $http.get('/data/data.json').then(function(d) {
            deferred.resolve(d);

        });
        this.getRules = function() {
            return deferred.promise;
        };
    }
]);

app.service('dataLeaderboard', ['$http', '$q', '$cookies',
    function($http, $q, $cookies) {
        var d1;
        var d2;

        /**
         * gets the leaderboard data of either gender
         * @param  {start index count of the leaderboard}
         * @param  {count of the shouts}
         * @param  {gender}
         * @return {promise with the leaderboard data}
         */
        this.getLeaderboard = function(s, c, g) {
            d1 = $q.defer();
            $http.get('http://dil.channeli.in/valentino/leaders/?start=' + s + '&count=' + c + '&gender=' + g + '&PHPSESSID=' + $cookies.PHPSESSID)
                .success(function(d) {
                    d1.resolve(d);
                });
            return d1.promise;
        };

        this.getCombinedLeaderboard = function() {
            d2 = $q.defer();
            $http.get('http://dil.channeli.in/valentino/leaders/?start=1&count=25&combined=true&PHPSESSID=' + $cookies.PHPSESSID).success(function(d) {
                //if(d.error==2){location.reload();}
                d2.resolve(d);
            });
            return d2.promise;
        };
    }
]);

app.service('dataShoutbox', ['$http', '$q',
    function($http, $q) {
        var deferred;


        this.getShoutbox = function(s, e) {
            deferred = $q.defer();
            $http.get('http://dil.channeli.in/messages/' + s + '/' + e)
                .success(function(d) {
                    deferred.resolve(d);
                });
            return deferred.promise;
        };
    }
]);

app.service('dataSingleShout', ['$http', '$q', function($http, $q) {
    var deferred;
    this.getShoutData = function(id) {
        deferred = $q.defer();
        $http.get('http://dil.channeli.in/message/' + id).success(function(d) {
            deferred.resolve(d);
        });
        return deferred.promise;
    };
}]);

app.service('embed', ['$http', '$q',
    function($http, $q) {
        this.getVideo = function(input) {
            var deferred = $q.defer();
            var regex = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[?=&+%\w-]*/gi;
            var x = input.match(regex);
            String.prototype.truncate = function(n) {
                return this.substr(0, n - 1) + (this.length > n ? '...' : '');
            };
            if (x) {
                var y = x[0].split('=');
                $http.get('https://www.googleapis.com/youtube/v3/videos?id=' + y[1] + '&key=AIzaSyCoJ6dFXpqs39y48isvRjv_yKpPsRtS_Uc&part=snippet,contentDetails,statistics,status')
                    .success(function(e) {
                        deferred.resolve(e);
                    });

            }

            return deferred.promise;
        };
    }
]);

app.service('messages', ['$http', '$q', '$cookies', function($http, $q, $cookies) {
    var deferredSendMsg;
    this.sendMsg = function(d, e) {
        deferredSendMsg = $q.defer();
        if (!d.message) {
            d.message = e + ' has sent you a rose.';
        }
        //  $http.post('https://channeli.in/valentino/rose_handler/',{
        //    'rc':d.rose_color,
        //    'anon':d.anon,
        //    'to':d.to,
        //    'message':d.message,
        //    'PHPSESSID':$cookies.PHPSESSID
        //    })
        $http.get('http://dil.channeli.in/valentino/rose_handler/?rc=' + d.rose_color + '&anon=' + d.anon + '&to=' + d.to + '&PHPSESSID=' + $cookies.PHPSESSID + '&message=' + d.message)
            .success(function(d) {
                //  if(d.error==2){location.reload();}
                deferredSendMsg.resolve(d);
            })
            .error(function(d) {
                deferredSendMsg.resolve(d);
            });
        return deferredSendMsg.promise;
    };
}]);

app.service('dataUser', ['$http', '$q', '$cookies', function($http, $q, $cookies) {
    var deferred;
    this.getUser = function(enr) {
        deferred = $q.defer();
        $http.get('http://dil.channeli.in/valentino/person_json/?enrol=' + enr + '&PHPSESSID=' + $cookies.PHPSESSID).success(function(d) {
            //    if(d.error==2){location.reload();}
            deferred.resolve(d);
        });
        return deferred.promise;
    };
}]);

app.factory('mySocket', function(socketFactory) {
    var myIoSocket = io.connect('http://dil.channeli.in'
        //,{transports: ['xhr-polling','websocket', 'flashsocket', 'htmlfile', 'jsonp-polling', 'polling']}
    );


    var mySocket = socketFactory({
        ioSocket: myIoSocket
    });

    return mySocket;
});

app.service('dashData', ['$http', '$cookies', '$q', function($http, $cookies, $q) {
    var deferred;
    this.getData = function(e) {
        deferred = $q.defer();
        $http.get('http://dil.channeli.in/valentino/person_json_private/?enrol=' + e + '&PHPSESSID=' + $cookies.PHPSESSID)
            .success(function(d) {
                deferred.resolve(d);
            });
        return deferred.promise;
    };
}]);
