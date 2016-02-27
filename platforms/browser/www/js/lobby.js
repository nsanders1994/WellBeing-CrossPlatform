$(document).ready(function(){
	var profileObj = window.localStorage.getItem("profile");
	var profile = JSON.parse(profileObj);
	var name = profile["First Name"] + " " + profile["Last Name"];
	$('#User-Name').html(name);
});

function addProfilePic(){
    navigator.camera.getPicture( cameraSuccess, cameraError, [ cameraOptions ] );
}