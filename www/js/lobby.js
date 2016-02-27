$(document).ready(function(){
	var profileObj = window.localStorage.getItem("profile");

	var profile = JSON.parse(profileObj);

	$('#User-Name').html(profile["First Name"] + " " + profile["Last Name"]);

    if(window.localStorage.getItem("profile-pic") != null){
        var profilePicData = window.localStorage.getItem("profile-pic");
        $('.round-image').attr("src","data:image/jpeg;base64," + profilePicData);
    }

});

function choosePic(){
    var pictureSource   = navigator.camera.PictureSourceType; // picture source
    var destinationType = navigator.camera.DestinationType; // sets the format of returned value

    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoSuccess, onFail,
        { quality: 50, allowEdit: true,
        destinationType: destinationType.DATA_URL,
        sourceType: pictureSource.PHOTOLIBRARY,
        targetWidth: 200, targetHeight: 200});
}

function takePic(){
    var destinationType = navigator.camera.DestinationType; // sets the format of returned value

    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoSuccess, onFail,
        { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL,
        targetWidth: 200, targetHeight: 200});
}


/////////////////////////////////////////
//         Picture Callbacks           //
/////////////////////////////////////////

function onFail(message) {
    $('.hidden').hide();
    alert('Failed because: ' + message);
}

function onPhotoSuccess(imageData) {
    // Uncomment to view the image file URI
    // console.log(imageURI);
    $('.hidden').hide();

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    window.localStorage.setItem("profile-pic", imageData);
    // TODO send image to server
    $('.round-image').attr("src", "data:image/png;base64," + imageData);
}