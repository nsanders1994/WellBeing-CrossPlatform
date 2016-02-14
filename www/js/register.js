function isValidEmail(email) {
  var re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9_.+-]+$/;
  return re.test(email);
}

function isValidPassword(pwd) {
  // at least one number, one letter
  // at least 7 characters
  var re = /(?=.*\d)(?=.*[a-zA-z]).{7,}/;
  return re.test(pwd);
}

function isPasswordMatch(pwd, pwd_confirm) {
  return (pwd == pwd_confirm)    
}


function onSubmit() {

	var name        = document.getElementById('user-name-input');
  var email       = document.getElementById('user-email-input');
  var pwd         = document.getElementById('user-password-input');
  var pwd_confirm = document.getElementById('user-password-confirm-input');
  var errorbox    = document.getElementById("errorbox");

  errorbox.style.color = "Red";

  if (!isValidEmail(email.value)) {
    window.location.href = "lobby.html";
    email.value = email.defaultValue;

    document.register.usermail.focus();
    errorbox.innerHTML = "Email must be in the correct format.";
  }
  else if (!isValidPassword(pwd.value)) {
    pwd.value = pwd.defaultValue;
    pwd_confirm.value = pwd_confirm.defaultValue;

    document.register.password.focus();
    errorbox.innerHTML = "Password has to be 7 or more characters, and contain at least 1 number, and 1 letter.";
  }
  else if (!isPasswordMatch(pwd.value, pwd_confirm.value)) {
    pwd.value = pwd.defaultValue;
    pwd_confirm.value = pwd_confirm.defaultValue;

    document.register.password.focus();
    errorbox.innerHTML = "Passwords don't match";
  }
  else {
    window.location.href = "lobby.html";
  }
}

