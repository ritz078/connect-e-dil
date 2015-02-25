'use strict';

var app = angular.module('valentinoApp');

app.controller('ValentinoController', ['ngNotify', '$location', '$scope', '$http', 'dataLeaderboard', 'dataShoutbox', 'mySocket',
    function(ngNotify, $location, $scope, $http, dataLeaderboard, dataShoutbox, mySocket) {

        $scope.go = function(a) {
            $location.path('/shout/' + a);
        };

        $scope.shouts = [];
        var promiseShoutbox = dataShoutbox.getShoutbox(1, 15);
        promiseShoutbox.then(function(d) {
            $scope.shouts = d;
        });

        /*=========================================================
        =            Load the data for the leaderboard            =
        =========================================================*/

        $scope.clb = [];
        var promiseLeaderboard = dataLeaderboard.getCombinedLeaderboard();
        promiseLeaderboard.then(function(d) {
            $scope.clb = d;

        });


        /**
         * This function submits the shout and adds it to the shout object after the succes event is emmited by the backend.
         * @param  {event}
         * @return {NULL}
         */
        $scope.submitShout = function(event) {

            if (event.keyCode !== 13 && !($('mentio-menu').is(':visible'))) {
                return;
            } else if (event.keyCode === 13 && !event.shiftKey && $scope.user.content) {
                event.preventDefault();
                $scope.user.time = new Date();
                mySocket.emit('chat message', $scope.user.content);

                $scope.user.content = '';
                mySocket.on('some error', function() {
                    ngNotify.set("Your message wasn't sent.You are being logged out", {
                        'position': 'top',
                        'type': 'error'
                    });
                });
            }
        };

        mySocket.on('chat message', function(d) {
            $scope.shouts.unshift(d);
        });


        /**
         * Loads shouts after the user scroll reaches the bottom of the shoutbox.
         * @param  {s:number of shouts already present in the shoutbox}
         * @return {NULL} : More shouts are loaded
         */
        $scope.loadShout = function(s) {
            var addShoutPromise = dataShoutbox.getShoutbox(s + 1, 15);
            addShoutPromise.then(function(d) {
                $scope.shouts = $scope.shouts.concat(d);
            });
        };


        /*===================================================================
        =            Transition effects in the shoutbox on focus            =
        ===================================================================*/

        $('#shoutInput').focus(function() {
            $(this).animate({
                height: '80px'
            });
        });

        $('#shoutInput').blur(function() {
            $(this).animate({
                height: '40px'
            });
        });


        /*-----  End of Transition effects in the shoutbox on focus  ------*/




    }
]);


app.controller('HomeController', ['$scope', '$interval', 'dashData', 'ngNotify', 'messages', function($scope, $interval, dashData, ngNotify, messages) {

    $scope.message = {
        'anon': false,
        'rose_color': 'RR'
    };
    $scope.sendMessage = function() {
        if ($scope.selectedReceiver.originalObject) {
            $scope.message.to = $scope.selectedReceiver.originalObject.id;
            if ($scope.message.anon && $scope.message.message) {
                ngNotify.set('Anonymous ? Really ? Why ? Why ? Why ?', 'error');
            } else {
                var sendMsgPromise = messages.sendMsg($scope.message, $scope.dash.name);
                sendMsgPromise.then(function(d) {
                    if (d.success) {
                        ngNotify.set('Your rose has been successfully sent . Cheers !!!', {
                            position: 'bottom',
                            type: 'success'
                        });
                        $scope.selectedReceiver = 0;
                        $scope.message.message = '';
                    } else if (d.info) {
                        ngNotify.set(d.msg, {
                            position: 'bottom',
                            type: 'error'
                        });
                        $scope.selectedReceiver = 0;
                        $scope.message.message = '';
                    }
                });
            }
        }
    };


    //tabs
    $('#tabs li a').click(function(e) {

        $('#tabs li, #content .current').removeClass('current').removeClass('fadeInLeft');
        $(this).parent().addClass('current');
        var currentTab = $(this).attr('href');
        $(currentTab).addClass('current fadeInLeft');
        e.preventDefault();

    });


    $scope.dash = {};
    var d = JSON.parse(angular.element('#data')[0].innerHTML);


    /*=========== polling code===============*/

    //  $interval(function(){
    //    var p=dashData.getData(d.enrollment_no);
    //    p.then(function(d){
    //      $scope.dash=d;
    //    })
    //  },150000);

    /*======================================*/


    if (!d.error) {
        $scope.dash = d;


        var daily = {
            'red_roses': [0, 0, 0, 0, 0, 0, 0, 0],
            'yellow_roses': [0, 0, 0, 0, 0, 0, 0, 0]
        };

        angular.forEach(d.rr_daywise, function(x) {
            daily.red_roses[x.day - 1] = x.count;
        });

        angular.forEach(d.yr_daywise, function(x) {
            daily.yellow_roses[x.day - 1] = x.count;
        });


        $scope.lineChart = {
            labels: ['7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th'],
            series: ['Red Roses', 'Yellow Roses'],
            data: [
                daily.red_roses, daily.yellow_roses
            ],
            options: {
                scaleGridLineColor: 'rgba(255,255,255,.05)',
                bezierCurve: false
            }
        };

        $scope.pieChart2 = {
            labels: ['Red Roses', 'Yellow Roses'],
            data: [d.red_roses, d.yellow_roses]
        };
    } else {
        ngNotify.set('Alert', {
            'position': 'top',
            'type': 'error'
        });
    }

}]);


app.controller('RulesController', ['$scope', 'dataRules', function($scope, dataRules) {
    $scope.rules = {};
    var valPromise = dataRules.getRules();
    valPromise.then(function(data) {
        $scope.rules = data.data.rules;
    });
}]);

app.controller('ShoutController', ['$scope', '$http', '$sce', 'embed', '$routeParams', 'dataSingleShout',
    function($scope, $http, $sce, embed, $routeParams, dataSingleShout) {

        var shPromise = dataSingleShout.getShoutData($routeParams.id);
        shPromise.then(function(d) {
            $scope.shout = d;


            String.prototype.truncate = function(n) {
                return this.substr(0, n - 1) + (this.length > n ? '...' : '');
            };

            /**
             * Extracting youtube video url
             * */
            $scope.shout.youtube = {};

            var embedPromise = embed.getVideo($scope.shout.content);
            embedPromise.then(function(e) {
                $scope.shout.youtube.id = e.items[0].id;
                $scope.shout.youtube.title = e.items[0].snippet.title;
                $scope.shout.youtube.desc = e.items[0].snippet.description.truncate(250);
                $scope.shout.youtube.videoUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + e.items[0].id + '?autoplay=1&theme=light&rel=0');
            });

            /**
             * Calculating Video Dimensions
             */
            var width = $('.center').width() - 100;
            var height = width * (315 / 560);
            $scope.videoDimensions = {
                'height': height,
                'width': width
            };

            /**
             Extracting image links
             **/

            var imgRegex = /((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi;
            var img = $scope.shout.content.match(imgRegex);
            if (img) {
                $scope.shout.imageUrl = img[0];
            }


        });


    }
]);

app.controller('UserController', ['$scope', '$http', '$routeParams', 'dataUser',
    function($scope, $http, $routeParams, dataUser) {

        var promise = dataUser.getUser($routeParams.enrolmentNo);
        promise.then(function(d) {
            if (!d.error) {
                $scope.wall = d;
                $scope.pieChart1 = {
                    labels: ['Bande', 'Bandiyan'],
                    data: [d.male_roses, d.female_roses]
                };

                $scope.pieChart2 = {
                    labels: ['Red Roses', 'Yellow Roses'],
                    data: [d.red_roses, d.yellow_roses]
                };

                var daily = {
                    'red_roses': [0, 0, 0, 0, 0, 0, 0, 0],
                    'yellow_roses': [0, 0, 0, 0, 0, 0, 0, 0]
                };

                angular.forEach(d.rr_daywise, function(x) {
                    daily.red_roses[x.day - 1] = x.count;
                });

                angular.forEach(d.yr_daywise, function(x) {
                    daily.yellow_roses[x.day - 1] = x.count;
                });


                $scope.lineChart = {
                    labels: ['7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th'],
                    series: ['Red Roses', 'Yellow Roses'],
                    data: [
                        daily.red_roses, daily.yellow_roses
                    ],
                    options: {
                        scaleGridLineColor: 'rgba(255,255,255,.05)',
                        bezierCurve: false
                    }
                };

            } else {
                $scope.wall = d;
            }
        });

        $scope.pieChart = {
            'colors': [{
                fillColor: 'rgba(255,255,255,0.3)',
                strokeColor: 'rgba(255,255,255,0.3)',
                pointColor: 'rgba(255,255,255,0.3)',
                pointStrokeColor: 'rgba(255,255,255,0.3)',
                pointHighlightFill: 'rgba(255,255,255,0.3)',
                pointHighlightStroke: 'rgba(255,255,255,0.3)'
            }, {
                fillColor: 'rgba(255,255,255,0.7)',
                strokeColor: 'rgba(255,255,255,0.7)',
                pointColor: 'rgba(255,255,255,0.7)',
                pointStrokeColor: 'rgba(255,255,255,0.7)',
                pointHighlightFill: 'rgba(255,255,255,0.7)',
                pointHighlightStroke: 'rgba(255,255,255,0.7)'
            }],
            options: {
                segmentShowStroke: false
            }
        };


    }
]);


app.controller('LeaderboardController', ['$scope', '$cookies', '$http', 'dataLeaderboard',
    function($scope, $cookies, $http, dataLeaderboard) {


        var promise = dataLeaderboard.getLeaderboard(1, 100, 'M');
        promise.then(function(d) {
            $scope.users = d;
        });

        $scope.updateGender = function(e) {
            var p1 = dataLeaderboard.getLeaderboard(1, 100, e);
            p1.then(function(d) {
                $scope.users = d;
            });
        };

        $scope.addtoLeaderboard = function(l) {
            var addPromise = dataLeaderboard.getLeaderboard(l, 5, $scope.selectedGender.gender);
            addPromise.then(function(ds) {
                angular.forEach(ds, function(d) {
                    $scope.users.push(d);
                });
            });

        };

        $scope.selectedGender = {
            'gender': 'M'
        };


    }
]);
