var slideNum = 0;
var slides = [];

$(document).ready(function(){
	$('.slick-div').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		infinite: false,
		arrows: false
	});

	var profile = JSON.parse(window.localStorage.getItem("profile"));
    var slideNo = 1;

	for(var section in profile){
        if(profile.hasOwnProperty(section)) {
            var slideHTML = generateSlideHTML(section, profile[section], slideNo);
            $('.slick-div').slick("slickAdd", slideHTML);
        }
	}

    /*var profile = JSON.parse(window.localStorage.getItem("profile"));
    var sectionList = Object.keys(profile);
    slideNum = (location.search).replace("?", "");

    alert(slideNum);

    for(var k = 0; k < sectionList.length; k++){
        var section = sectionList[k];
        slides.push(generateSlideHTML(section, profile[section], k));
    }

    alert(slides[slideNum]);

    $('.editable-slide').html(slides[slideNum]);*/
});

function generateSlideHTML(sectionTitle, data, i){
    var open_tag = "\<div style=\"height:85%;\">";
    var title = "\<h1 contenteditable='true' style=\"height:100%;\">" + sectionTitle + "\</h1>";
    var open_table_tag = "\<table id=\"Slide" + i.toString() + "\" \style=\"width:100%\">";
    var content = String();
    var close_table_tag = "\</table>";
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
                var label = "\<td style=\"font-weight: bold;\">" + currItem[0] + "\:</td>";
                var value = "\<td contenteditable=\'true\'>" + currItem[1] + "\</td>";

                if (label.indexOf("Name") > -1) {
                    content = "\<tr style=\"height:85%;\" name = " + label + "\>" + label + value + "\</tr>" + content;
                }
                else {
                    content += "\<tr style=\"height:85%;\" name = " + label + "\>" + label + value + "\</tr>";
                }
            }
        }
    }

    return open_tag + title + open_table_tag + content + close_table_tag + close_tag;
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
    $('.slick-div').html = slides[++slideNum];
}

function prev(){
    $('.slick-div').html = slides[--slideNum];
}

function onSubmit(){
    // Check Edit Queue

    // Save Current Edit

    var table = document.getElementById("Slide");
    for (var i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        for (var j = 0, col; col = row.cells[j]; j++) {
            //iterate through columns
            //columns would be accessed using the "col" variable assigned in the for loop
        }
    }

    // href back to profile.html
}
