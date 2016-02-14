/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

    
function isValidEmail(email) {
    var re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9_.+-]+$/;
    return re.test(email);
}

function get_profile(token) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                response = JSON.parse(xhttp.responseText);
                if (response.status == "success") {
                    alert("Profile load success!" + response.profile["First Name"] + " " + response.profile["Last Name"] + " " + response.profile["Gender"]);
                    window.localStorage.setItem("profile", JSON.stringify(response.profile));

                } else {
                    alert("Profile load failed!");
                }
            }
            else {
                /* Internal server error or CORS error */
                alert("Profile load failed! (Server Error)");
            }
        }

    };

    xhttp.open("POST", "https://wellbeing-mobile.crc.nd.edu/mobile_app_api/get_profile/", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("token=" + window.localStorage.getItem("Token"));
}

function onSubmit() {
    var pwd = document.getElementById('user-password-input')
    var email = document.getElementById('user-email-input');
    var errorbox = document.getElementById("errorbox");
    var xhttp = new XMLHttpRequest();

    errorbox.style.color = "Red";

    if (pwd.value == "" || pwd.value == null){
        errorbox.innerHTML = "Empty Field";
        document.login.password.focus();
    }
    else if (email.value == "" || email.value == null) {
        errorbox.innerHTML = "Empty Field";
        document.login.usermail.focus();
    }
    /*else if (!isValidEmail(email.value)){
        errorbox.innerHTML = "Invalid Email Address";
        pwd.value = pwd.defaultValue;
        document.login.usermail.focus();
    }*/
    else{
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 200) {
                    response = JSON.parse(xhttp.responseText);

                    if (response.status == "success") {
                        errorbox.innerHTML = "Login Successful";
                        window.localStorage.setItem("Token", response.token);
                        get_profile(response.token);

                        window.location.href = 'lobby.html';

                    } else {
                        errorbox.innerHTML = "Login Failed";
                        window.localStorage.removeItem("Token");

                        pwd.value = pwd.defaultValue;
                        document.login.usermail.focus();
                    }
                }
                else {
                    /* Internal server error or CORS error */
                    errorbox.innerHTML = "Login Failed (Server Error)";
                    pwd.value = pwd.defaultValue;
                    document.login.usermail.focus();

                    //window.location.href = 'lobby.html';
                }
            }

        };

        xhttp.open("POST", "https://wellbeing-mobile.crc.nd.edu/mobile_app_api/get_token/", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhttp.send("username=" + email.value + "&password=" + pwd.value);

    }    
}