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
//Or you can leave the source stream, but set it via mystranscriptionist.setStream(mystream); at a later time
mystranscriptionist.start(); // This will start the audio capture from the source stream

mytranscriptionist.stop(); // This will stop the audio capture, decode it then send to google speech for transcription.

var transcript = mystranscriptionist.getTranscript(); // This will return the transcript texts. 
```
**Note:** Everything happens in asynchronous mode, so you have to keep checking the getTranscript() until there's a value. Take note also that sometimes network drops and the transcript may not return, and also sometimes the web browser fails to decode the audio thus transcription will fail.


