$(document).ready(function(){
	var profileObj = window.localStorage.getItem("profile");
	var profile = JSON.parse(profileObj);

	$('#User-Name').innerHTML = profile["First Name"] + " " + profile["Last Name"];
});