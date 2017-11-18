function AudioCapture(config) {
    if (!config.stream) {
        config.recorder = undefined;
        config.datachunks = [];
        return;
    }

    try {
        config.recorder = new MediaRecorder(config.stream);
        config.recorder.ondataavailable = function(e) {
            if (config.recorder.state == 'recording') {
                config.datachunks.push(e.data);
            }
        };

        config.recorder.start(500);

        config.recorder.onstop = function() {
            if (config.datachunks.length > 0 && config.recorder.state == 'inactive') {
                var blob = new Blob(config.datachunks, { type: 'audio/webm; codecs=opus' });

                var AudioContext = window.AudioContext || window.webkitAudioContext;
                var audioctx = new AudioContext();
                var filereader = new FileReader();
                filereader.onload = function(event) {
                    audioctx.decodeAudioData(
                        event.target.result,
                        function(decodedaudio) {
                            var downsampledaudio = downSampleToPCM16(decodedaudio.getChannelData(0), 48000, 16000);
                            var newblob = new Blob([new Int16Array(downsampledaudio)]);
                            sendLPCM16ToGoogleSpeech(
                                newblob, 
                                'LINEAR16', 
                                16000,
                                function(result) {
                                    if (result.results && result.results[0]) {
                                        var transcript = "";
                                        for (j = 0; j < r.results.length; ++j) {
                                            transcript += r.results[j].alternatives[0].transcript;
                                        }
                                        config.transcript = transcript;
                                    }
                                }
                            );
                            newblob = null;
                            audioctx.close();
                            audioctx = null;
                        },
                        function(e) {
                            newblob = null;
                            audioctx.close();
                            audioctx = null;
                            console.error(e)
                        }
                    );
                    filereader = null;
                    blob = null;
                };
                filereader.readAsArrayBuffer(blob);
            }

            config.datachunks = [];
            config.recorder = undefined;
        };

        config.recorder.onerror = function (e) {
            config.datachunks = [];
            config.recorder = undefined;
            console.error(e);
        };
    } catch(exception) {
        config.recorder = undefined;
        config.datachunks = [];
        console.error(exception)
    }
}

function downSampleToPCM16(buffer, inputsamplerate, targetsamplerate) {
    if (targetsamplerate == inputsamplerate) {
        console.warn("No operation! Input sample rate is the same as target sample rate.");
        return buffer;
    }
    if (targetsamplerate > inputsamplerate) {
        console.error("Target sample rate should be smaller than the input sample rate");
        return null;
    }
    var ratio = inputsamplerate / targetsamplerate;
    var newbuffersize = Math.round(buffer.length / ratio);
    var result = new Int16Array(newbuffersize);
    var offsetresult = 0;
    var offsetbuffer = 0;
    while (offsetresult < result.length) {
        var nextoffsetbuffer = Math.round((offsetresult + 1) * ratio);
        var accum = 0, count = 0;
        for (var i = offsetbuffer; i < nextoffsetbuffer && i < buffer.length; i++) {
            accum += buffer[i];
            count++;
        }

        result[offsetresult] = Math.min(1, accum / count) * 0x7FFF;
        offsetresult++;
        offsetbuffer = nextoffsetbuffer;
    }

    return result.buffer;
}