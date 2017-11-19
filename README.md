GNSWebRTC_Transcriptionist
==========================

A very lightweight client side JavaScript library for producing transcripts (textual representation of audio speech) of WebRTC audio. The source stream can also be the microphone by way of getUserMedia() or even recorded webm audio files.

Requirement
===========
Modern browser with HTML5 and EcmaScript 5-6 support

Sample usage
============

```javascript
//First step in using this library is to create a google cloud account. 
//If you have a gmail, you can just login with that in https://cloud.google.com/speech/. 
//After logging-in, go to console -> then APIs & services -> Library
//in the search box type speech, click the enable switch. Next go again to 
//console -> APIS & services -> credentials from that page, generate an API key and copy 
//that key to initializeGoogleSpeech() in GoogleSpeech.js.
//
// e.g. your API key is: AIzaSyBYaNO1it65RbcWbw35yENMgQXtszcV3Pw
//
//function initializeGoogleSpeech() {
//    gapi.client.setApiKey('AIzaSyBYaNO1it65RbcWbw35yENMgQXtszcV3Pw');
//
//    // Load the speech client library via its discovery URL
//    gapi.client.load('https://speech.googleapis.com/$discovery/rest?version=v1');
//}
```

```html
<!-- Include the js files in your html in the following order-->
<script type="text/javascript" src="GoogleSpeech.js"></script>
<script type="text/javascript" src="AudioCapture.js"></script>
<script type="text/javascript" src="Transcriptionist.js"></script>
<script type="text/javascript" src="https://apis.google.com/js/client:api.js?onload=initializeGoogleSpeech"></script>
```

```javascript
//Instantiate the transcriptionist object
var mytranscriptionist = new Transcriptionist(/*your source stream here*/);
//Note: You can leave the source stream then you can set it 
//via mystranscriptionist.setStream(mystream)
//
//e.g. of source streams
//--From a webm file--
//Use file input to browse for the webm audio file
//<input type="file" onChange="readFile(this);"/>
//function readFile (evt) {
//    var files = evt.target.files;
//    var file = files[0];
//    var reader = new FileReader();
//    reader.onload = function(event) {
//        var mytranscriptionist = new Transcriptionist(event.target.result);
//        mystranscriptionist.start();
//        mystranscriptionist.onTranscript = function(transcript) {
//            alert(transcript);
//        }
//    }
//    reader.readAsArrayBuffer(file)
//}
//
//--From the microphone--
//navigator.getUserMedia = navigator.getUserMedia ||
//                         navigator.webkitGetUserMedia ||
//                         navigator.mozGetUserMedia;
//
//navigator.getUserMedia({ audio: true },
//                       function(stream) {
//                           var mytranscriptionist = new Transcriptionist(stream);
//                           mystranscriptionist.start();
//                           mystranscriptionist.onTranscript = function(transcript) {
//                               alert(transcript);
//                           }
//                       },
//                       function(err) { console.error(err); }
//                      );
//
//--From WebRTC audio--
//this depends on your implementation but basically just get 
//the stream from the RTP/SRTP channels then pass that in the parameter

mystranscriptionist.start(); //This will start the audio capture from the source stream

mytranscriptionist.stop(); //This will stop the audio capture, decode then send to 
                           //google speech for transcription.

mystranscriptionist.onTranscript = function(transcript) {
    //This is the event handler that will be called once the transcript arrived.
    //Add your logic to make use of the transcript
} 
```


