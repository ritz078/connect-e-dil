![Imgur](http://i.imgur.com/2Q0rKr7.jpg?1)


Contents
--------
* [Screenshots](https://github.com/ritz078/valentino/blob/canary/screenshots/screenshots.md)
* [Features](#features)
* [Languages / Frameworks/ Tools used](#languages/frameworks/tools-used)
* [Setting it up](#setting-it-up)
* [Credits](#credits)

![Screen](https://github.com/ritz078/valentino/blob/canary/screenshots/screen.jpg)


Features
--------

1. Send yellow/red roses to friends/valentine.
  * Both as anonymous and non-anonymous.
  * Message sending feature if not anonymous.
  * Easily search friends/valentine using autocomplete ([angucomplete-alt](https://github.com/ghiden/angucomplete-alt))
2. Shoutbox where everyone can post literally anything :stuck_out_tongue_winking_eye:
  * Emoticons enabled ([ngEmoticons](https://github.com/ritz078/ngEmoticons))
  * Customizable Profanity filter.
  * Relative timing of post using ([angular-moment](https://github.com/urish/angular-moment))
  * Infinite scroll ([ngNanoscroller](https://github.com/ritz078/ngNanoscroller))
  * Convert links to anchor tags.
  * Video and image embed (Currently supports youtube videos
    only).Fetches video details using youtube data API.
  * Realtime updation using socket.io
3. LeaderBoard
  * Separate Leader for boys and girls and also a combined leaderboard.
  * A global leaderboard with infinite scroll.
4. User profile
  * Separate public user profile of every user.
  * Contains graphs of received roses and daywise statistics ([angular-chart.js](https://github.com/jtblin/angular-chart.js))
5. Dashboard
  * Send flowers to others.
  * View received messages and flowers.
  * Personal Data visualisation on graphs and in numbers.

Languages/Frameworks/Tools used
------------------------------------

* [AngularJS](https://angularjs.org/)
* [SASS](http://sass-lang.com/)
* [susy](http://susy.oddbird.net/)
* [grunt](http://gruntjs.com/)
* [yeoman.io](http://yeoman.io/)
* [Bower](http://bower.io/)

Setting it Up
---------------

* Clone the repo.
* Install ```NodeJS``` ```Grunt``` and ```bower```
* Run ```npm install && bower install```
* Install Ruby.
* Install SASS and susy using ```gem install sass``` and ```gem install
  susy```
* Run ```grunt serve``` to run the server and start development.
* For production files run ```grunt build```


Credits
-------
* [Yeoman.io](http://yeoman.io) for the webapp generator.
* M from nounproject for the heart vector used in the logo.


Happy valentine
===============
