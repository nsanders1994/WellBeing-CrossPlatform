/*  $("p").on("swipe",function(){
    $("span").text("Swipe detected!");
  });                       
});*/

//alert("before");
$(document).on("pageinit", function(){
	alert("pagecreate");
	$("#test").swipe(function(){
		alert("Swipe Right!");
		document.getElementById("test").innerHTML = "swiped right";
	});
});