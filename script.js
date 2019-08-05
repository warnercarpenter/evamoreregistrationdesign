var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function myFunction(x) {
    x.classList.toggle("change");
}

function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    if (n <= 1) {
        document.getElementById("formH3").innerHTML = "We'll start with the easy stuff";
    } else if (n <= 4) {
        document.getElementById("formH3").innerHTML = "The finer details";
    } else if (n <= 6) {
        document.getElementById("formH3").innerHTML = "Now the fun part";
    } else if (n === 7) {
        document.getElementById("formH3").innerHTML = "Let's get social";
    } else if (n === 8) {
        document.getElementById("formH3").innerHTML = "Additional options";
    } else {
        document.getElementById("formH3").innerHTML = "Upload your artist image";
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        document.getElementById("regForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value == "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false:
            valid = false;
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
}

document.getElementById('imageUpload').addEventListener('change', function () {
    if (this.files && this.files[0]) {
        var img = document.getElementById('imageUpload');  // $('img')[0]
        img.style = "background-image: url(" + URL.createObjectURL(this.files[0]) + ")"; // set src to file url
        if (document.getElementById("removeImage").classList.contains("hidden") === true) {
            document.getElementById("removeImage").classList.toggle("hidden");
        }
    }
});

document.getElementById("removeImage").addEventListener('click', function () {
    document.getElementById("imageUploadContainer").innerHTML = '<input id="imageUpload" type="file" style="background-image: url(\'./images/draganddrop.png\')" />'
    document.getElementById('imageUpload').addEventListener('change', function () {
        if (this.files && this.files[0]) {
            var img = document.getElementById('imageUpload');  // $('img')[0]
            img.style = "background-image: url(" + URL.createObjectURL(this.files[0]) + ")"; // set src to file url
            if (document.getElementById("removeImage").classList.contains("hidden") === true) {
                document.getElementById("removeImage").classList.toggle("hidden");
            }
        }
    });
    document.getElementById("removeImage").classList.toggle("hidden");
})

document.getElementById("regForm").addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (e.srcElement.localName === "input") {
        if (key === 13) {
            document.getElementById("nextBtn").click();
        }
    }
})