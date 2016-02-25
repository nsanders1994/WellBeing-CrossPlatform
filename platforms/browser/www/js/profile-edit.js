$(document).ready(function(){
    $('.your-class').slick({
        setting-name: setting-value
    });
});

$(document).on("pageinit", function(){
	alert("pagecreate");
	$("#test").swipe(function(){
		alert("Swipe Right!");
		document.getElementById("test").innerHTML = "swiped right";
	});
});