var profile = JSON.parse(window.localStorage.getItem("profile"));

$(document).ready(function(){
	$('.slick-div').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: false,
		arrows: false
	});

    var slideNo = 1;

	for(var section in profile){
        if(profile.hasOwnProperty(section)) {
            var slideHTML = generateSlideHTML(section, profile[section], slideNo);
            $('.slick-div').slick("slickAdd", slideHTML);
        }
	}
});

function generateSlideHTML(sectionTitle, data, sectionNum){
    var open_tag = "\<div style=\"height:85%;\">";
    var title = "\<h1 class='profile-sections' style=\"height:100%;\">" + sectionTitle + "\</h1>";
    var open_form_tag = "\<form class='input-form carousel' style='text-align: left'>";
    var content = String();
    var close_form_tag = "\</form>";
    var close_tag = "\</div\>";
    var allKeys = Object.keys(data);

    // Sort keys alphabetically
    allKeys.sort();

    for(var i = 0; i < allKeys.length; i++){
        var formattedList = formatProfileContent(allKeys[i], data);

        for(var j = 0; j < formattedList.length; j++){
            var currItem = formattedList[j];

            // If the item isn't already on the slide, add it
            if(content.indexOf(currItem[0]) < 0) {
                var label = "\<h2>" + currItem[0] + "\:</h2>";
                var value = "\<input type='text' class='profile-inputs' name='"
                    + currItem[0] + "' section='" + sectionTitle + "' value='" + currItem[1] + "'/>";

                if (label.indexOf("Name") > -1) {
                    content = label + value + content;
                }
                else {
                    content += label + value;
                }
            }
        }
    }

    return open_tag + title + open_form_tag + content + close_form_tag + close_tag;
}

function formatProfileContent(key, data){
    var addressKeywords = ["Home Address", "Home City", "Home State", "Home Zip", "Work Address", "Work City", "Work State", "Work Zip", "Country"];

    if(key.indexOf("Name") > -1){
        var parsedKey = key.split(" ");
        var nameType = parsedKey.splice(0, parsedKey.length - 2).join(" ");

        // Format name "<First Name> <Last Name>"
        if(parsedKey.length > 2 && nameType + " First Name" in data && nameType + " Last Name" in data){
            var firstNameKey = parsedKey.splice(0, parsedKey.length - 2).join(" ") + " First Name";
            var lastNameKey = parsedKey.splice(0, parsedKey.length - 2).join(" ") + " Last Name";

            return [[firstNameKey, data[firstNameKey]], [lastNameKey, data[lastNameKey]]];
        }
        else {
            return [[key, data[key]]];
        }
    }
    else if(addressKeywords.indexOf(key) > -1){
        // Get address type -- Home or Work
        var addrType = key.split(" ")[0] + " ";
        var addrList = [];

        var address = addrType + "Address";
        var city = addrType + "City";
        var state = addrType + "State";
        var zip = addrType + "Zip";

        // Format address list so address items are in order
        if(address in data || city in data || state in data || "Country" in data || zip in data){
            // Add address if one is listed
            if(address in data) {
                addrList.push([address, data[address]]);
            }
            // Add city if one is listed
            if(city in data) {
                addrList.push([city, data[city]]);
            }
            // Add state if one is listed
            if(state in data) {
                addrList.push([state, data[state]]);
            }
            // Add country if one is listed
            if("Country" in data){
                addrList.push(["Country", data["Country"]]);
            }
            // Add zipcode if one is listed
            if(zip in data) {
                addrList.push([zip, data[zip]]);
            }

            return addrList;
        }
        else{
            return [[key, data[key]]];
        }
    }
    else {
        return [[key, data[key]]];
    }
}

function next(){
    $('.slick-div').slick('slickNext');
}

function prev(){
    $('.slick-div').slick('slickPrev');
}

function onSubmit(){
    // Check Edit Queue

    // Save Current Edit
    var allInputs = $(".profile-inputs");
    alert(allInputs.length);
    for (var i = 0; i < allInputs.length; i++){
        var currInput = allInputs[i];
        var sectionName = currInput.getAttribute("section");
        profile[sectionName][currInput.name] = currInput.value;
    }

    window.localStorage.setItem("profile", JSON.stringify(profile));

    // href back to profile.html
    window.location.href = "profile.html";
}
