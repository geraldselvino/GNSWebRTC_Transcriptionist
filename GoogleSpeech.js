function initializeGoogleSpeech() {
    gapi.client.setApiKey('your google api key here');

    // Load the speech client library via its discovery URL
    gapi.client.load('https://speech.googleapis.com/$discovery/rest?version=v1');
}

function sendLPCM16ToGoogleSpeech(blob, encoding, rate, callback) {
    var filereader = new FileReader();
    filereader.onload = function(event) {
        gapi.client.speech.speech.recognize(
            {
                config: {
                    encoding: encoding,
                    sampleRateHertz: rate,
                    languageCode: 'en-US'
                },
                audio: {
                    content: btoa(event.target.result)
                }
            }   
        ).execute(function(result) {
            callback(result);
        });

        filereader = null;
    }
    filereader.readAsBinaryString(blob);
}

