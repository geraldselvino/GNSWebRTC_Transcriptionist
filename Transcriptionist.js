function Config() {
    this.recorder = undefined;
    this.datachunks = [];
}

function Transcriptionist(mediastream) {
    this.sessionconfig = new Config();
    this.sessionconfig.stream = mediastream;
}

Transcriptionist.prototype = {
    start: function() {
        AudioCapture(this.sessionconfig);
    },
    stop: function() {
        if (this.sessionconfig && this.sessionconfig.recorder)
            this.sessionconfig.recorder.stop();
    },
    setStream: function(mediastream) {
        this.sessionconfig.stream = mediastream;
    },
    getTranscript: function() {
        if (this.sessionconfig.transcript)
            return this.sessionconfig.transcript;
    }
}