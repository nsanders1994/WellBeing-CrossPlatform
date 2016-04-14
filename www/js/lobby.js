$(document).ready(function(){
    // Get user profile from local storage
	var profileObj = window.localStorage.getItem("profile");
	var profile = JSON.parse(profileObj);

    // Update username in lobby
    if(profile != null &&
       "Personal Info" in profile &&
       "First Name" in profile["Personal Info"] &&
       "Last Name" in profile["Personal Info"]){

        $('#User-Name').html(profile["Personal Info"]["First Name"] + " " + profile["Personal Info"]["Last Name"]);
    }

    // Update profile pic in lobby
    if(window.localStorage.getItem("profile-pic") != null){
        var profilePicData = window.localStorage.getItem("profile-pic");
        $('.round-image').attr("src","data:image/jpeg;base64," + profilePicData);
    }

});

function choosePic(){
    var pictureSource   = navigator.camera.PictureSourceType; // picture source
    var destinationType = navigator.camera.DestinationType; // sets the format of returned value

    // Retrieve image as base64-encoded string from specified source and crop
    navigator.camera.getPicture(onPhotoSuccess, onFail,
        { quality: 50, allowEdit: true,
        destinationType: destinationType.DATA_URL,
        sourceType: pictureSource.PHOTOLIBRARY,
        targetWidth: 200, targetHeight: 200});
}

function takePic(){
    var destinationType = navigator.camera.DestinationType; // sets the format of returned value

    // Take picture using device camera, crop, and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoSuccess, onFail,
        { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL,
        targetWidth: 200, targetHeight: 200});
}


/////////////////////////////////////////
//         Picture Callbacks           //
/////////////////////////////////////////

function onFail(message) {
    // toggle off the user dialog
    $('.hidden').hide();
    alert('Failed because: ' + message);
}

function onPhotoSuccess(imageData) {
    // toggle off the user dialog
    $('.hidden').hide();

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    window.localStorage.setItem("profile-pic", imageData);
    // TODO send image to server
    $('.round-image').attr("src", "data:image/png;base64," + imageData);
}