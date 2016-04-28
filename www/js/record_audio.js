/*jslint browser:true, devel:true, white:true, vars:true, eqeq:true, -W069, -W020*/
/*global $:true, phoneCheck:false, Media:false, LocalFileSystem:false*/
/*
 * Copyright (c) 2014, Intel Corporation. All rights reserved.
 * File revision: 04 February 2014
 * Please see http://software.intel.com/html5/license/samples
 * and the included README.md file for license terms and conditions.
 */

var recording = false;
var playback = false;
var my_recorder = null, my_player = null;
var progressTimer = null;
var createdStatus = false;
var recTime = 0;

// for recording: do not specify any directory
var mediaFileFullName = null;
var mediaRecFile = "myRecording100.wav";
var checkFileOnly = false;
var mediaFileExist = false;

/* console.log et al are not always available in Firefox. This silences it and prevents a JS error. */
if(typeof console === "undefined") {
    console = { log: function() { } };
}



function onOK_GetFile(fileEntry) {
    console.log("***test: File " + mediaRecFile + " at " + fileEntry.fullPath);

    // save the full file name
    mediaFileFullName = fileEntry.fullPath;
    if (phoneCheck.ios)
        mediaRecFile = mediaFileFullName;

    if (checkFileOnly === true) { // check if file exist at app launch.
        mediaFileExist = true;
    }
    else { // record on iOS

        // create media object using full media file name
        my_recorder = new Media(mediaRecFile, onMediaCallSuccess, onMediaCallError);

        // specific for iOS device: recording start here in call-back function
        recordNow();
    }
}

function onSuccessFileSystem(fileSystem) {
    console.log("***test: fileSystem.root.name: " + fileSystem.root.name);

    if (checkFileOnly === true)
        fileSystem.root.getFile(mediaRecFile, { create: false, exclusive: false }, onOK_GetFile, null);
    else
        fileSystem.root.getFile(mediaRecFile, { create: true, exclusive: false }, onOK_GetFile, null);

}

function checkMediaRecFileExist() {
    checkFileOnly = true;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onSuccessFileSystem, null);
}

/*Enable Mic image: Display Record or active image*/
function enableMic(status){
    if (status === 0){
        document.getElementById('startRecID').src = "./images/simplemicrophone_rec.png";
        document.getElementById('startRecID').className = " ";
    }
    else if (status == 1){
        document.getElementById('startRecID').src = "./images/simplemicrophone.png";
        document.getElementById('startRecID').className += " greenoutline";
    }
}

function toggleRecording(){
    if(recording){
        recording = false;
        stopRecording();
    }
    else if(!playback) {
        recording = true;
        startRecording();
    }
}

function togglePlayback(){
    if(playback){
        playback = false;
        stopAudio();
    }
    else if(!recording){
        playback = true;
        playAudio();
    }
}


function recordNow() {
    if (my_recorder) {
        alert('recording')
        document.getElementById('recording_status').innerHTML = "Recording...";
        document.getElementById('record-btn').style.background = "#003366";
        recording = true;
        my_recorder.startRecord();
    }
    else {
        alert("my_recorder==null: in startRecording()");
    }

    /*// reset the recTime every time when recording
    recTime = 0;

    // Stop recording after 10 sec
    progressTimer = setInterval(function() {
        recTime = recTime + 1;
        if (recTime >= 10)
            stopRecording();
        console.log("***test: interval-func()***");
    }, 1000);*/
}

// Record audio
//
function startRecording() {
    // create media object - overwrite existing recording

    if (my_recorder) {
        my_recorder.release();
    }

    if (phoneCheck.android) {
        my_recorder = new Media(mediaRecFile, onMediaCallSuccess, onMediaCallError);
        recordNow();
    }
    else if (phoneCheck.windowsphone) {
        my_recorder = new Media(mediaRecFile, onMediaCallSuccess, onMediaCallError);
        recordNow();
    }
    else if (phoneCheck.ios) {
        //first create the file
        checkFileOnly = false;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onSuccessFileSystem, function() {
            alert("failed in creating media file in requestFileSystem");
        });
    }

}

// Stop recording
function stopRecording() {
    if (my_recorder) {
        my_recorder.stopRecord(); // the file should be moved to "/sdcard/"+mediaRecFile
    }

    recording = false;
    document.getElementById('recording_status').innerHTML = "";
    document.getElementById('record-btn').style.background = "#0099CC";
}

// Play audio
function playAudio() {
    if (my_player === null) { // play existing media recorded from previous session
        // the existing media should be on /sdcard/ for android.
        if (phoneCheck.android) {
            my_player = new Media("/sdcard/" + mediaRecFile, onMediaCallSuccess, onMediaCallError);
        } else if (phoneCheck.windowsphone) // windows phone
            my_player = new Media(mediaRecFile, onMediaCallSuccess, onMediaCallError);
        else if (phoneCheck.ios) {
            my_player = new Media(mediaFileFullName, onMediaCallSuccess, onMediaCallError);
        }
    }

    // Play audio
    if (my_player) {
        my_player.play();
        document.getElementById('recording_status').innerHTML = "Playback...";
        document.getElementById('play-btn').style.background = "#003366";
        playback = true;

        progressTimer = setInterval(function () {
            // get my_player position
            my_player.getCurrentPosition(
                // success callback
                function (position) {
                    if (position <= 0){
                        // reached end of media: same as clicked stop-music
                        stopAudio();
                    }

                },
                // error callback
                function (e) {
                    alert("Error: " + e);
                });
        }, 1000);
    }
}

// Stop audio
function stopAudio() {
    if (my_player) {
        my_player.stop();

        // should not be necessary, but it is needed in order to play again.
        my_player.release();
        my_player = null;

    }

    document.getElementById('recording_status').innerHTML = "";
    document.getElementById('play-btn').style.background = "#0099CC";
    playback = false;
}

// Media() success callback
function onMediaCallSuccess() {
    createdStatus = true;
    //alert("***test: new Media() succeeded ***");
}
// Media() error callback
function onMediaCallError(error) {
    alert("new Media() failed: " + JSON.stringify(error));
    document.getElementById('recording_status').innerHTML = "";
    document.getElementById('play-btn').style.background = "#0099CC";
    document.getElementById('record-btn').style.background = "#0099CC";
    playback = false;
    recording = false;
}

