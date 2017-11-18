function Config() {
    this.recorder = undefined;
    this.datachunks = [];
}

function Transcriptionist(mediastream) {
    this.sessionconfig = new Config();
    this.sessionconfig.stream = mediastream;
    this.onTranscript = function(transcript){}
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
        this.sessionconfig.stream = mediastream;
    }
}