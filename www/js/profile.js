$(document).ready(function(){
	$('.slick-div').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		infinite: false,
        arrows: false
	});

    var profile = JSON.parse(window.localStorage.getItem("profile"));

    for(var section in profile){
        var slideHTML = generateSlideHTML(section, profile[section]);
        $('.slick-div').slick("slickAdd", slideHTML);
    }
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

    for(var i = 0; i < allKeys.length; i++){
        var formattedPair = formatProfileContent(allKeys[i], data);

        // If our formatted content isn't null and it is not in the HTML content, add it
        if(formattedPair != null && content.indexOf(formattedPair[0]) < 0){
            var label = "\<td style=\"font-weight: bold;\">" + formattedPair[0] + "\:</td>";
            var value = "\<td>" + formattedPair[1] + "\</td>";

            if(label.indexOf("Name") > -1){
                content = "\<tr style=\"height:85%;\">" + label + value + "\</tr>" + content;
            }
            else{
                content += "\<tr style=\"height:85%;\">" + label + value + "\</tr>";
            }
        }
    }

    return open_tag + title + open_table_tag + content + close_table_tag + close_tag;
}

function formatProfileContent(key, data){
    var addressKeywords = ["Home Address", "Home City", "Home State", "Home Zip", "Work Address", "Work City", "Work State", "Work Zip", "Country"];

    if(key.indexOf("Name") > -1){
        var parsedKey = key.split(" ");
        var firstNameKey = "First Name";
        var lastNameKey = "Last Name";

        if(parsedKey.length > 2){
            firstNameKey = parsedKey.splice(0, parsedKey.length - 2).join(" ") + " First Name";
            lastNameKey = parsedKey.splice(0, parsedKey.length - 2).join(" ") + " Last Name";
        }

        return ["Name", data[firstNameKey] + " " + data[lastNameKey]];
    }
    else if(addressKeywords.indexOf(key) > -1){
        // Get address type -- Home or Work
        var addrType = key.split(" ")[0] + " ";
        var addr;

        // Format address
        if(addrType + "Address" in data && addrType + "City" in data && addrType + "State" in data){
            addr = data[addrType + "Address"] + "\n" + data[addrType + "City"] + ", " + data[addrType + "State"];

            // Add country if one is listed
            if("Country" in data){
                addr += ", " + data["Country"];
            }

            // Add zipcode if one is listed
            if("Country" in data) {
                addr += " " + data[addrType + "Zip"];
            }

            return [addrType + "Address", addr];
        }
        else{
            return [key, data[key]];
        }
    }
    else {
        return [key, data[key]];
    }
}

function next(){
    $('.slick-div').slick('slickNext');
}

function prev(){
    $('.slick-div').slick('slickPrev');
}	

function edit(){
    alert("Hit Edit");
}