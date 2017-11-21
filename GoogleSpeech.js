/**********************************************************
* Copyright (c) 2017, Gerald Selvino 
* <gerald.selvino@protonmail.com> All rights reserved.
*
* These functions wraps the google speech api for our use
***********************************************************/

/**
* @brief The initialization function for google speech
*/ 
function initializeGoogleSpeech() {
    gapi.client.setApiKey('your google api key here');

    // Load the speech client library via its discovery URL
    gapi.client.load('https://speech.googleapis.com/$discovery/rest?version=v1');
}

/**
* @brief Sends the audio linear PCM 16 Khz 16 bit to google speech
* for transcribing.
* @param blob - A binary string representation of the raw LPCM16 audio
* @param encoding - Specifies the encoding of the blob, in our case
* it is LINEAR16, code name for linear PCM 16 Khz.
* @param rate - The sampling rate of the blob, 16000 in our case
* @param callback - The callback function to call after google speech
* is done doing the transcription
*/ 
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

