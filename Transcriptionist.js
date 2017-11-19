function Config() {
    this.recorder = undefined;
    this.datachunks = [];
    this.stream = undefined;
}

function Transcriptionist(mediastream) {
    this.sessionconfig = new Config();
    if (mediastream)
        this.sessionconfig.stream = mediastream;

    this.onTranscript = function(transcript) {};
}

Transcriptionist.prototype = {
    start: function() {
        AudioCapture(this.sessionconfig, this.onTranscript);
    },
    stop: function() {
        if (this.sessionconfig && this.sessionconfig.recorder)
            this.sessionconfig.recorder.stop();
    },
    setStream: function(mediastream) {
        if (mediastream)
            this.sessionconfig.stream = mediastream;
    }
}