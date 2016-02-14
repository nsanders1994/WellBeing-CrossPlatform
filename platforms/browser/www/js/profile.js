$(document).on("pageinit", function(){
	alert("in pageinit")
	var profileObj = window.localStorage.getItem("profile");
	var profile = JSON.parse(profileObj);

	// Profile Elements
	var nameElement = document.getElementById("name");
	var idElement = document.getElementById("ID");
    var subjectStatusElement = document.getElementById("subject-status");
    var nameElement = document.getElementById("name");
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
    // nameElement.innerHTML = profile["First Name"] + " " + profile["Last Name"];

    $('#Profile').slick();
});

