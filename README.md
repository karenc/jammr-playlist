NAME
----

    jammr.playlist - A jQuery audio playlist widget using media element.js

VERSION
-------

    0.0.0

DEPENDENCIES
------------

 * jQuery
 * jQuery UI
 * media element.js

INSTALL
-------

    Include <script src="jammr_playlist.js"></script> in your head tag to start
    using jammr.playlist.

USAGE
-----

    Create an <audio> tag where you want the widget to appear, then do $('audio').playlist();

    <html>
      <head>
          <script type="text/javascript" src="jquery.js"></script>
          <script type="text/javascript" src="jquery-ui.js"></script>
          <script type="text/javascript" src="mediaelement-and-player.js"></script>
          <script type="text/javascript" src="jammr_playlist.js"></script>
      </head>
      <body>
          <audio></audio>
          <script type="text/javascript">
              $('audio').playlist({
                  playlist: [{
                      "startDate": "2013-07-16T05:28Z",
                      "duration": "00:30:15",
                      "owner": "stefanha",
                      "users": ["stefanha", "lennard", "andhai"],
                      "url": "http://jammr.net/recorded_jams/2",
                      "mixUrl": "files/1.m4a",
                      "tracksUrl": "http://test.jammr.net/secret/tracks.zip"
                  }]
              });
          </script>
      </body>
    </html>

FILES
-----

 * __README.md__: this file, contains installation and usage instructions
 * __tests.html__: QUnit tests for jammr.playlist
 * __jammr_test.py__: Python http server for ajax tests
 * __lib__: directory with libraries used by jammr.playlist, used by tests
 * __files__: media files for QUnit tests
 * __js/jammr\_playlist.js__: the jammr.playlist widget
 * __js/jammr\_playlist\_tests.js__: QUnit tests for jammr.playlist

TESTS
-----

    To run the QUnit tests for jammr.playlist:

 1. ./jammr\_test.py
 2. Visit http://localhost:8000/tests.html in your browser

AUTHOR
------

    Written by Karen Chan <karen@karen-chan.com>.
