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
                    var track = this_.getTrack();
                    if (track) {
                        mediaElement.setSrc(track);
                        mediaElement.load();
                        if (this_.options.autoPlay) {
                            mediaElement.play();
                        }
                    }
                }
            });
        },

        nextTrack: function() {
            this.currentTrack++;
        },

        getTrack: function() {
            if (this.playlist.length > 0) {
                return this.playlist[this.currentTrack]['mixUrl'];
            }
        },

    });
}(jQuery));
