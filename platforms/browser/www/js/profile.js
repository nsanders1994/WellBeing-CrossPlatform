function parseAddr(profile, addrType){
    if (profile["Country"] != null) {
        return profile[addrType + " Address"] + "\n" + \
               profile[addrType + " City"] + ", " + profile[addrType + " State"] + ", " + \
               profile["Country"] + " " + profile[addrType + " Zip"];
    }
    else {
        return profile[addrType + " Address"] + "\n" + \
               profile[addrType + " City"] + ", " + profile[addrType + " State"] + " " + profile[addrType + " Zip"];
    }
}

function addSlickSlide(section, dataList){

    $(.slick-div).slick("slickAdd", newHTML);
}

function assignInnerHTML(element, tag, keys, profile){
    htmlStr = tag + " ";

    if(tag == "Work Address:"){
        htmlStr += parseAddr(profile, "Work");
    }
    else if (tag == "Home Address:"){
        htmlStr += parseAddr(profile, "Home");
    }
    for(k : keys){
        if(profile[k]){
            htmlStr += profile[k] + " ";
        }
    }
}

$(document).ready(function(){
	$('.slick-div').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		infinite: false,
        arrows: false
	});

    /*// List of all slides to be added to slick caros
    var slickCarousel = [];

    // Dictionaries of data fields & their values to be added to the carousel
    var personalSlide = {
        "SubjectID":undefined:
        "Title":undefined;
        "First Name":undefined;
        "Last Name":undefined;
        "Suffix":undefined;
        "Group":undefined;
        "Research Type":undefined;
        "Organization Name":undefined;
    };

    var demographicsSlide = {
        "Birthday":undefined;
        "Gender":undefined;
        "Ethnicity":undefined;
        "Highest Educational Level":undefined;
        "Language":undefined;
        "Job Role":undefined;
        "Position":undefined;
        "Marital Status":undefined;
    };
    var contactInfoSlide = {
        "Preferred Email":undefined;
        "Alternative Email":undefined;
        "Home Phone":undefined;
        "Work Phone":undefined;
        "Cell Phone":undefined;
        "Home Address":undefined;
        "Home City":undefined;
        "Home State":undefined;
        "Home Zip":undefined;
        "Work Address":undefined;
        "Work City":undefined;
        "Work State":undefined;
        "Work Zip":undefined;
        "Country":undefined;

    };
    var otherInfoSlide = {
        "Year Began Profession":undefined;
        "Date Joined Research":undefined;
        "Bi-Vocational":undefined;
        "Has Left Vocation":undefined;
        "Notes":undefined;
    };
    var organizationSlide = {
        "Website":undefined;
        "District":undefined;
        "Grade Level":undefined;
        "Location/Settings":undefined;
    };
    var spouseSpecificInfoSlide = {
        "Spouse SubjectID":undefined;
        "Spouse First Name":undefined;
        "Spouse Last Name":undefined;
        "Spouse Email":undefined;
    };
    var clergySpecificInfoSlide = {
        "Denomination Category":undefined;
        "Denomination":undefined;
        "Seminary Attended":undefined;
        "Year Graduated Seminary";
    };*/   

	/*var profileObj = window.localStorage.getItem("profile");
	var profile = JSON.parse(profileObj);

	// Profile Elements
	var nameElement = document.getElementById("name");
	var idElement = document.getElementById("ID");
    var subjectStatusElement = document.getElementById("subject-status");
    var researchTypeElement = document.getElementById("research-type");
    var genderElement = document.getElementById("gender");
    var ethnicityElement = document.getElementById("ethnicity");
    var dobElement =document.getElementById("DOB");
    var ageElement = document.getElementById("age");
    var languageElement = document.getElementById("language");
    var jobElement = document.getElementById("job");
    var positionElement =document.getElementById("position");
    var degreeElement = document.getElementById("degree");
    var maritalStatusElement = document.getElementById("marital-status");
    var preferredEmailElement =  document.getElementById("preferred-email");
    var altEmailElement =  document.getElementById("alt-email");
    var cellNoElement = document.getElementById("cell-no");
    var homeNoElement = document.getElementById("home-no");
    var workNoElement =  document.getElementById("work-no");
    var homeAddrElement =  document.getElementById("home-addr");
    var workAddrElement =  document.getElementById("work-addr");
    var spouseIdElement = document.getElementById("spouse-ID");
    var spouseNameElement = document.getElementById("spouse-name");
    var dateJoinedResearchElement = document.getElementById("date-joined-research");
    var yrBeganProfessionElement = document.getElementById("yr-began-profession");
    var bivocationalElement = document.getElementById("bivocational");
    var leftVocationElement = document.getElementById("left-vocation");
    var groupsElement = document.getElementById("groups");
    var notesElement = document.getElementById("notes");
    var orgNameElement = document.getElementById("org-name");
    var orgTypeElement =document.getElementById("org-type");
    var headquartersAddrElement = document.getElementById("headquarters-addr");
    var headquartersPhoneNoElement = document.getElementById("headquarters-phone-no");
    var orgEmailElement = document.getElementById("org-email");
    var orgWebsiteElement = document.getElementById("org-website");
    var orgDistrictElement = document.getElementById("org-district");
    var orgLocationElement = document.getElementById("org-location");
    var orgNotesElement =document.getElementById("org-notes");

    // Assign Text from Profile Elements

    // Personal
    assignInnerHTML(nameElement, tag, ["FirstName", "Last Name"])
    assignInnerHTML(idElement, )
    $("#name").innerHTML            = "Name: " + profile["First Name"] + " " + profile["Last Name"];
    $("#ID").innerHTML              = "ID: " + profile["ID"];
    $("#subject-status").innerHTML  = profile["First Name"];
    $("#research-type").innerHTML   = profile["First Name"]

    $("#gender").innerHTML          = "Gender: " + profile["Gender"]
    $("#ethnicity").innerHTML       = "Ethnicity: " + profile["Ethnicity"]
    $("#DOB").innerHTML             = "Birthday: " + profile["Birthday"]
    $("#age").innerHTML             = profile["First Name"]
    $("#language").innerHTML        = "Language: " + profile["Language"]
    $("#job").innerHTML             = "Job Role: " + profile["Job Role"]
    $("#position").innerHTML        = "Position: " + profile["Position"]
    $("#degree").innerHTML          = profile["Highest Educational Level"]
    $("#marital-status").innerHTML  = profile["First Name"]

    $("#preferred-email").innerHTML = "Preferred Email: " + profile["Preferred Email"]
    $("#alt-email").innerHTML       = "Alternative Email: " + profile["Alternative Email"]
    $("#cell-no").innerHTML         = "Cell Phone: " + profile["Cell Phone"]
    $("#home-no").innerHTML         = "Home Phone: " + profile["Home Phone"]
    $("#work-no").innerHTML         = "Work Phone: " + profile["Work Phone"]
    $("#home-addr").innerHTML       = "Home Address: " + parseHomeAddr(profile);
    $("#work-addr").innerHTML       = "Work Address: " + parseWorkAddr(profile);

    $("#spouse-ID").innerHTML               = "Spouse ID: " + profile["Spouse SubjectID"]
    $("#spouse-name").innerHTML             = "Spouse Name: " + profile["Spouse First Name"] + " " + profile["Spouse Last Name"]
    $("#spouse-email").innerHTML            = "Spouse Email: " + profile["Spouse Email"]
    $("#date-joined-research").innerHTML    = "Date Joined Research: " + profile["Date Joined Research"]
    $("#yr-began-profession").innerHTML     = "Year Began Profession: " + profile["Year Began Profession"]
    $("#bivocational").innerHTML            = "Bivocational: " + profile["Bi-Vocational"]
    $("#left-vocation").innerHTML           = profile["First Name"]
    $("#groups").innerHTML                  = "Group: " + profile["Group"]
    $("#notes").innerHTML                   = "Notes: " + profile["Notes"]

    $("#org-name").innerHTML                = "Organization Name: " + profile["Organization Name"]
    $("#org-type").innerHTML                = profile["First Name"]
    $("#headquarters-addr").innerHTML       = profile["First Name"]
    $("#headquarters-phone-no").innerHTML   = profile["First Name"]
    $("#org-email").innerHTML               = profile["First Name"]
    $("#org-website").innerHTML             = "Organization Website: " + profile["Website"]
    $("#org-district").innerHTML            = "Organization District: " + profile["District"]
    $("#org-location").innerHTML            = profile["First Name"]
    $("#org-notes").innerHTML               = profile["First Name"]


    $('#Profile').slick({
    	slidesToShow: 1,
    	slidesToScroll: 1,
    	dots: true
    });*/
});

function next(){
    //alert('next');
    $('.slick-div').slick('slickNext');
}

function prev(){
    //alert('prev');
    $('.slick-div').slick('slickPrev');
}	

function edit(){
    alert("Hit Edit");
}