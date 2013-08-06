(function($) {
    $.widget('jammr.playlist', {

        options: {
            startPage: 0,
            listSize: 10,
            currentTrack: 0,
            autoPlay: true,
            playlist: [],
            url: '',
            mediaType: 'audio/mp4'
        },

        _create: function() {
            this.page = this.options.startPage;
            this.listSize = this.options.listSize;
            this.currentTrack = this.options.currentTrack;
            this.playlist = this.options.playlist;
            this.url = this.options.url;
            var this_ = this;
            this.player = new MediaElementPlayer(this.element[0], {
                type: this.options.mediaType,
                success: function(mediaElement, domObject) {
                    this_.mediaElement = mediaElement;
                    this_.domObject = domObject;

                    this_.getPlaylist(function() {
                        this_.start();
                        this_.playNextTrackOnEnded();
                    });
                }
            });
        },

        start: function() {
            var this_ = this;
            this.loadTrack(function(track) {
                if (this_.options.autoPlay) {
                    this_.mediaElement.play();
                }
            });
        },

        playNextTrackOnEnded: function() {
            var this_ = this;
            $(this.domObject).on('ended', function() {
                this_.currentTrack++;
                this_.loadTrack(function(track) {
                    this_.mediaElement.play();
                });
            });
        },

        loadTrack: function(callback) {
            var this_ = this;
            function _callback(track) {
                if (track) {
                    this_.mediaElement.setSrc(track);
                    this_.mediaElement.load();
                    $(this_.domObject).on('canplaythrough', function() {
                        callback(track);
                    });
                }
            }

            if (this.playlist.length > 0 && this.currentTrack < this.playlist.length) {
                _callback(this.playlist[this.currentTrack]['mixUrl']);
            }
        },

        getPlaylist: function(callback) {
            if (this.playlist.length === 0 && this.url) {
                $.getJSON(this.url, function(data) {
                    this.playlist = data;
                    callback();
                });
            } else {
                callback();
            }
        }

    });
}(jQuery));
