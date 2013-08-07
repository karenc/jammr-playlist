(function($) {

    function endsWith(string, term) {
        var index = string.indexOf(term);
        return index !== -1 && index + term.length === string.length
    }

    QUnit.testDone(function(details) {
        $('.svg').remove();
    });

    test('initialization of media player', function() {
        strictEqual($('audio').length, 0, 'there should be no audio elements');
        $('<audio>').appendTo('body').playlist({
            autoPlay: false
        });
        strictEqual($('audio').length, 1, 'there should be one audio element');
    });

    asyncTest('initialization of playlist', function() {
        $('<audio>').appendTo('body').playlist({
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

        $('audio').on('play.tests', function() {
            strictEqual($('audio').length, 1, 'there should be one audio element');
            strictEqual($('audio')[0].paused, false, 'the audio should be playing automatically');
            strictEqual($('audio')[0].muted, false, 'the audio should not be muted');
            ok(endsWith($('audio')[0].src, 'files/1.m4a'), 'the src should be set to the first mixUrl of the playlist');
            start();
        });
    });

    test('auto play set to false', function() {
        $('<audio>').appendTo('body').playlist({
            autoPlay: false,
            playlist: [{
                "startDate": "2013-07-16T05:28Z",
                "duration": "00:30:15",
                "owner": "stefanha",
                "users": ["stefanha", "lennard", "andhai"],
                "url": "http://jammr.net/recorded_jams/2",
                "mixUrl": "files/3.m4a",
                "tracksUrl": "http://test.jammr.net/secret/tracks.zip"
            }]
        });
        strictEqual($('audio').length, 1, 'there should be one audio element');
        strictEqual($('audio')[0].paused, true, 'the audio should not be playing automatically');
        strictEqual($('audio')[0].muted, false, 'the audio should not be muted');
        ok(endsWith($('audio')[0].src, 'files/3.m4a'), 'the src should be set to the first mixUrl of the playlist');
    });

    asyncTest('play tracks as ordered in playlist', function() {
        var t;
        $('<audio>').appendTo('body').playlist({
            playlist: [{
                "startDate": "2013-07-17T00:00Z",
                "duration": "00:00:02",
                "owner": "stefanha",
                "users": ["stefanha"],
                "url": "http://jammr.net/recorded_jams/3",
                "mixUrl": "files/1.m4a",
                "tracksUrl": "http://test.jammr.net/secret/tracks.zip"
            }, {
                "startDate": "2013-07-17T00:00Z",
                "duration": "00:00:02",
                "owner": "stefanha",
                "users": ["stefanha"],
                "url": "http://jammr.net/recorded_jams/3",
                "mixUrl": "files/2.m4a",
                "tracksUrl": "http://test.jammr.net/secret/tracks.zip"
            }, {
                "startDate": "2013-07-16T05:28Z",
                "duration": "00:30:15",
                "owner": "stefanha",
                "users": ["stefanha", "lennard", "andhai"],
                "url": "http://jammr.net/recorded_jams/2",
                "mixUrl": "files/3.m4a",
                "tracksUrl": "http://test.jammr.net/secret/tracks.zip"
            }]
        });

        $('audio').on('play.tests', function() {
            // first track
            strictEqual($('audio').length, 1, 'there should be one audio element');
            strictEqual($('audio')[0].paused, false, 'the audio should be playing automatically');
            strictEqual($('audio')[0].muted, false, 'the audio should not be muted');
            ok(endsWith($('audio')[0].src, 'files/1.m4a'), 'the src should be set to the first mixUrl of the playlist');
            $('audio').off('play.tests');

            $('audio').on('play.tests', function() {
                // second track
                strictEqual($('audio').length, 1, 'there should be one audio element');
                strictEqual($('audio')[0].paused, false, 'the audio should be playing automatically');
                strictEqual($('audio')[0].muted, false, 'the audio should not be muted');
                ok(endsWith($('audio')[0].src, 'files/2.m4a'), 'the src should be set to the next mixUrl of the playlist');
                $('audio').off('play.tests');

                $('audio').on('play.tests', function() {
                    // third track
                    strictEqual($('audio').length, 1, 'there should be one audio element');
                    strictEqual($('audio')[0].paused, false, 'the audio should be playing automatically');
                    strictEqual($('audio')[0].muted, false, 'the audio should not be muted');
                    ok(endsWith($('audio')[0].src, 'files/3.m4a'), 'the src should be set to the next mixUrl of the playlist');
                    start();
                    clearTimeout(t);
                });
            });
        });

        t = setTimeout(function() { ok(false, 'test timed out'), start(); }, 10000);
    });

    asyncTest('get playlist using an ajax request', function() {
        var t;
        $('<audio>').appendTo('body').playlist({
            url: 'http://localhost:8000/'
        });
        $('audio').on('play.tests', function() {
            // first track
            strictEqual($('audio').length, 1, 'there should be one audio element');
            strictEqual($('audio')[0].paused, false, 'the audio should be playing automatically');
            strictEqual($('audio')[0].muted, false, 'the audio should not be muted');
            ok(endsWith($('audio')[0].src, 'files/1.m4a'), 'the src should be set to the first mixUrl of the playlist');

            $('audio').off('play.tests');
            $('audio').on('play.tests', function() {
                // second track
                strictEqual($('audio').length, 1, 'there should be one audio element');
                strictEqual($('audio')[0].paused, false, 'the audio should be playing automatically');
                strictEqual($('audio')[0].muted, false, 'the audio should not be muted');
                ok(endsWith($('audio')[0].src, 'files/2.m4a'), 'the src should be set to the next mixUrl of the playlist');

                $('audio').off('play.tests');

                $('audio').on('play.tests', function() {
                    // third track
                    strictEqual($('audio').length, 1, 'there should be one audio element');
                    strictEqual($('audio')[0].paused, false, 'the audio should be playing automatically');
                    strictEqual($('audio')[0].muted, false, 'the audio should not be muted');
                    ok(endsWith($('audio')[0].src, 'files/3.m4a'), 'the src should be set to the next mixUrl of the playlist');

                    start();
                    clearTimeout(t);
                });
            });
        });
        t = setTimeout(function() { ok(false, 'test timed out'), start(); }, 10000);
    });

}(jQuery));
