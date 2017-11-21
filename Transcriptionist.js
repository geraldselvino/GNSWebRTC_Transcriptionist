/**********************************************************
* Copyright (c) 2017, Gerald Selvino 
* <gerald.selvino@protonmail.com> All rights reserved.
*
* This file contains the function constructor for the
* library's programming interface.
***********************************************************/

/**
* @brief Function constructor containing the configurations
*/ 
function Config() {
    this.recorder = undefined;
    this.datachunks = [];
    this.stream = undefined;
}

/**
* @brief The function constructor to instantiate the Transcriptionist
* library
* @param mediastream - The source audio stream. Can be a webm audio file,
* a microphone thru the getUserMedia(), or the remote side audio stream
* of a WebRTC call
*/ 
function Transcriptionist(mediastream) {
    this.sessionconfig = new Config();
    if (mediastream)
        this.sessionconfig.stream = mediastream;

    this.onTranscript = function(transcript) {};
}

/**
* @brief Simply the Transcriptionist prototype
*/ 
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