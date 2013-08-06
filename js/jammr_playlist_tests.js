(function($) {

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

    test('initialization of playlist', function() {
        $('<audio>').appendTo('body').playlist({
            playlist: [{
                "startDate": "2013-07-16T05:28Z",
                "duration": "00:30:15",
                "owner": "stefanha",
                "users": ["stefanha", "lennard", "andhai"],
                "url": "http://jammr.net/recorded_jams/2",
                "mixUrl": "http://objects.dreamhost.com/jammr/20130803_1802_5luj3iKxLy.m4a",
                "tracksUrl": "http://test.jammr.net/secret/tracks.zip"
            }]
        });
        strictEqual($('audio').length, 1, 'there should be one audio element');
        strictEqual($('audio')[0].paused, false, 'the audio should be playing automatically');
        strictEqual($('audio')[0].muted, false, 'the audio should not be muted');
        strictEqual($('audio')[0].src, 'http://objects.dreamhost.com/jammr/20130803_1802_5luj3iKxLy.m4a', 'the src should be set to the first mixUrl of the playlist');
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
                "mixUrl": "http://objects.dreamhost.com/jammr/20130803_1802_5luj3iKxLy.m4a",
                "tracksUrl": "http://test.jammr.net/secret/tracks.zip"
            }]
        });
        strictEqual($('audio').length, 1, 'there should be one audio element');
        strictEqual($('audio')[0].paused, true, 'the audio should not be playing automatically');
        strictEqual($('audio')[0].muted, false, 'the audio should not be muted');
        strictEqual($('audio')[0].src, 'http://objects.dreamhost.com/jammr/20130803_1802_5luj3iKxLy.m4a', 'the src should be set to the first mixUrl of the playlist');
    });

}(jQuery));
