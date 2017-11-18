GNSWebRTC_Transcriptionist
==========================

A very lightweight client side JavaScript library for producing transcripts (textual representation of audio speech) of WebRTC audio. The source stream can also be the microphone by way of getUserMedia() or even recorded webm audio files.

Requirement
===========
Modern browser with HTML5 and EcmaScript 5-6 support

Sample usage
============

```html
<!-- Include the js files -->
<script type="text/javascript" src="GoogleSpeech.js"/>
<script type="text/javascript" src="AudioCapture.js"/>
<script type="text/javascript" src="Transcriptionist.js"/>
```

```javascript
//Instantiate the transcriptionist object
var mytranscriptionist = new Transcriptionist(/*your source stream here*/);
//Note: You can leave the source stream but set it via mystranscriptionist.setStream(mystream) at a later time
//e.g. of source streams
//From a webm file
//
//From the microphone
//
//For the WebRTC audio, that depends on your implementation but simply get the stream from the RTP/SRTP channels
//then pass it as parameter

mystranscriptionist.start(); // This will start the audio capture from the source stream

mytranscriptionist.stop(); // This will stop the audio capture, decode it then send to google speech for transcription.

mystranscriptionist.onTranscript = function(transcript) {
    //This is the event handler that will be called once the transcript arrived.
    //Add your logic to make use of the transcript
} 
```


