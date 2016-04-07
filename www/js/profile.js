var slideNo = 0;

$(document).ready(function(){
	$('.slick-div').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		infinite: false,
        arrows: false
	});

    var formattedProfile = {};
    var profile = JSON.parse(window.localStorage.getItem("profile"));
    for(var section in profile){
        if(profile.hasOwnProperty(section)){
            var slideHTML = generateSlideHTML(section, profile[section], formattedProfile);
            $('.slick-div').slick("slickAdd", slideHTML);
        }
    }

    window.localStorage.setItem("formattedProfile", JSON.stringify(formattedProfile));
});

function generateSlideHTML(sectionTitle, data){
    var open_tag = "\<div style=\"height:85%;\">";
    var title = "\<h1 style=\"height:100%;\">" + sectionTitle + "\</h1>";
    var open_table_tag = "\<table style=\"width:100%\">";
    var content = String();
    var close_table_tag = "\</table>";
    var close_tag = "\</div\>";
    var allKeys = Object.keys(data);

    // Sort keys alphabetically
    allKeys.sort();

    // Iterate through all keys to add them to the slide
    for(var i = 0; i < allKeys.length; i++){
        // Formats items like addresses & names into list to keep certain items together (e.g. address, state, zip, etc)
        var formattedList = formatProfileContent(allKeys[i], data);

        // Iterate through the formatted list (e.g. address)
        for(var j = 0; j < formattedList.length; j++){
            var currItem = formattedList[j];

            // If the item isn't already on the slide, add it
            if(content.indexOf(currItem[0]) < 0){
                var label = "\<td style=\"font-weight: bold;\">" + currItem[0] + "\:</td>";
                var value = "\<td>" + currItem[1] + "\</td>";

                // Names should always be at the top
                if(label.indexOf("Name") > -1){
                    content = "\<tr style=\"height:85%;\">" + label + value + "\</tr>" + content;
                }
                else{
                    content += "\<tr style=\"height:85%;\">" + label + value + "\</tr>";
                }
            }
        }
    }

    return open_tag + title + open_table_tag + content + close_table_tag + close_tag;
}

function formatProfileContent(key, data){
    var addressKeywords = ["Home Address", "Home City", "Home State", "Home Zip", "Work Address", "Work City", "Work State", "Work Zip", "Country"];
    var itemList = [];

    if(key.indexOf("Name") > -1){
        // Get name type -- Spouse or none
        var parsedKey = key.split(" ");
        var nameType = parsedKey.splice(0, parsedKey.length - 2).join(" ");
        var firstNameKey = "First Name";
        var lastNameKey = "Last Name";

        if(parsedKey.length >= 2 && nameType != ""){
            firstNameKey = parsedKey.splice(0, parsedKey.length - 2).join(" ") + " First Name";
            lastNameKey = parsedKey.splice(0, parsedKey.length - 2).join(" ") + " Last Name";
        }

        // Format name "<First Name> <Last Name>"
        if(firstNameKey in data && lastNameKey in data){
            itemList.push(["Name", data[firstNameKey] + " " + data[lastNameKey]]);
            return itemList;
        }
        else {
            itemList.push([key, data[key]]);
            return itemList;
        }
    }
    else if(addressKeywords.indexOf(key) > -1){
        // Get address type -- Home or Work
        var addrType = key.split(" ")[0] + " ";

        var address = addrType + "Address";
        var city = addrType + "City";
        var state = addrType + "State";
        var zip = addrType + "Address";

        // Format address as one string -- "<Address> <City>, <State>, <Country> <Zip>"
        if(address in data && city in data && state in data){
            var fullAddr = data[address] + "\n" + data[city] + ", " + data[state];

            // Add country if one is listed
            if("Country" in data){
                fullAddr += ", " + data["Country"];
            }

            // Add zipcode if one is listed
            if(zip in data) {
                fullAddr += " " + data[zip];
            }

            itemList.push([address, fullAddr]);
            return itemList;
        }
        // Format an address list such that address items are in order
        else{
            // Add address if one is listed
            if(address in data){
                itemList.push([address, data[address]]);
            }
            // Add city if one is listed
            if(city in data){
                itemList.push([city, data[city]]);
            }
            // Add state if one is listed
            if(state in data){
                itemList.push([state, data[state]]);
            }
            // Add country if one is listed
            if("Country" in data){
                itemList.push(["Country", data["Country"]]);
            }
            // Add zip if one is listed
            if(zip in data){
                itemList.push([zip, data[zip]]);
            }

            return itemList;
        }
    }
    else {
        itemList.push([key, data[key]]);
        return itemList;
    }
}

function next(){
    $('.slick-div').slick('slickNext');
}

function prev(){
    $('.slick-div').slick('slickPrev');
}	

function edit(){
    alert("in edit");
    window.location.href = 'profile-edit.html?' + $('.slick-div').slick('slickCurrentSlide');
}