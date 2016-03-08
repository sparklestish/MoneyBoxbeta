
var serverURL = "http://moneyboxapp.envisiongh.net/test-database/";  // please change this to your server address.


var file;          /* this will save the image file when the user selects input from files*/
var isFromCamera;  /* a flag to indicate that the file is from the camera */
var imageSavedURI; /* this saves the image URI for uploading when using the camera */
var username;      /* hold the name of the user */
var firstname;
var lastname;
var email;
var phone;
var item_name;
var item_desc;
var brand;
var category;
var condition;
var branch;
var loanamount;




/**
 * This simply allows the user to continue when they have chosen
 * the image.
 *
 */
function enableContinue() {
    document.getElementById("continue-btn").style.display = "inline-block";
}



/**
 * This is called when we load an image from the files.
 *
 * We then save this image to the global variable and 
 * we will use it later when uploading the file.
 *  
 * Note that we still save its URI inorder to pass it to 
 * the canvas for reviewing.
 *
 */
function loadFromFiles(event) {


    var fileInput = event.target.files; // get the input files
    if (fileInput.length > 0) { // check if we have at least one file
        isFromCamera = false;
        file = event.target.files[0]; // save to the global variable the file we need.
        var windowURL = window.URL || window.webkitURL;
        imageSavedURI = windowURL.createObjectURL(fileInput[0]);
        
        enableContinue(); // finally enable the user to continue to review page.
    }
}

/**
 * This function will allow us to get the picture from the camera.
 * 
 * We then get the image's URI and save it in the global variable
 * since we will need it for further uploading the file.
 *
 * In case of an error, we display the error message.
 *
 */
function takePicture() {
    navigator.camera.getPicture( 
        function( imageURI ) {
            isFromCamera = true;
            imageSavedURI = imageURI;
            enableContinue(); // enable the user to continue
        },
        function(message) {
            alert(message);
        },
        {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            encodingType: Camera.EncodingType.JPEG,
            sourceType: Camera.PictureSourceType.CAMERA
        }
    );
}

/**
 * This function is used to draw the image gotten from the
 * user through the saved URI. 
 *
 */
function drawImage (imageURI) {
    var photoCanvas = document.getElementById("image-canvas");
    var ctx = photoCanvas.getContext("2d");
    var photo = new Image();
    photo.onload = function() {
        photoCanvas.height = photo.height;
        photoCanvas.width = photo.width;
        ctx.drawImage(photo, 0, 0, photo.width, photo.height);
    }
    photo.src = imageURI;
}


/**
 * This is the main function responsible of uploading the image to the server.
 * 
 * Note that it first checks if the image we have is gotten from the camera
 * or the folder (using the isFromCamera flag).
 * 
 * If gotten from the camera, then we need to use the imageSavedURI to uplaod
 * the image. 
 *
 * If from file, we then use the file global variable. We use a FormData object
 * to upload the file using ajax.
 * 
 */
function uploadPhoto(){
    if (isFromCamera == true) {
        var ft = new FileTransfer();
        var options = new FileUploadOptions();

        options.fileKey = "image";
        // we use the file name to send the username
        options.fileName = "filename.jpg"; 
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        options.params = { 
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "phone": phone,
            "item_name": item_name,
            "item_desc": item_desc,
            "brand": brand,
            "category": category,
            "condition": condition,
            "branch": branch,
            "loanamount": loanamount

        };

        ft.upload(imageSavedURI, encodeURI(serverURL + "upload.php"),
            function (e) {
                alert("Image uploaded");
            },
            function (e) {
                alert("Upload failed");
            }, 
            options
        );
    } else {
        var formdata = new FormData();
        formdata.append("image", file);
        formdata.append("firstname", firstname);
        formdata.append("lastname", lastname);
        formdata.append("email", email);
        formdata.append("phone", phone);
        formdata.append("item_name", item_name);
        formdata.append("item_desc", item_desc);
        formdata.append("brand", brand);
        formdata.append("category", category);
        formdata.append("condition", condition);
        formdata.append("branch", branch);
        formdata.append("loanamount", loanamount);
        var ajax = new XMLHttpRequest();
        ajax.upload.addEventListener("progress", progressHandler, false);
        ajax.addEventListener("load", completeHandler, false);
        ajax.addEventListener("error", errorHandler, false);
        ajax.addEventListener("abort", abortHandler, false);
        ajax.open("POST", serverURL + "upload.php");
        ajax.send(formdata);
    }
}
/**
 * The following are utility functions for use with ajax when 
 * uploading the image.
 */
//============================================================================
function progressHandler(event){
    var percent = (event.loaded / event.total) * 100;
    if (percent == 100)
        alert("Image uploaded");
}
function completeHandler(event){
    alert(event.target.responseText);
}
function errorHandler(event){
    alert("Upload Failed");
}
function abortHandler(event){
    alert("Upload Aborted");
}
//============================================================================

/**
 * This is just a utility function that creates the review page when
 * continue is pressed.
 *
 */
function loadReviewPage() {
    firstname = document.getElementById("firstname").value;
    lastname = document.getElementById("lastname").value;
    email = document.getElementById("email").value;
    phone = document.getElementById("phone").value;
    item_name = document.getElementById("item_name").value;
    item_desc = document.getElementById("item_desc").value;
    brand = document.getElementById("brand").value;
    category = document.getElementById("category").value;
    condition = document.getElementById("condition").value;
    branch = document.getElementById("branch").value;
    loanamount = document.getElementById("loanamount").value;
    if (item_name == "") {
        alert("Please provide an item name");
        return;
    }
    if (item_desc == "") {
        alert("Please provide an item description");
        return;
    }
    if (loanamount == "") {
        alert("Please enter a loan amount");
        return;
    }

    var reviewPage = document.getElementById("reviewpage");
    var currentPage = document.getElementById("current-page");
    reviewPage.removeChild(currentPage);

    var newPage = document.createElement("div");
    newPage.setAttribute("id", "current-page");
    var title = document.createElement("div");
    title.setAttribute("class", "navbar-title");
    var titleText = document.createTextNode("Loan Application Review");
    title.appendChild(titleText);
    newPage.appendChild(title);

    var reviewForm = document.createElement("div");
    reviewForm.setAttribute("class", "w-form");


    var name = document.createElement("h4");
    var nameText = document.createTextNode("First Name: " + firstname);
    name.appendChild(nameText);
    newPage.appendChild(name);

     var name2 = document.createElement("h4");
    var nameText2 = document.createTextNode("Last Name: " + lastname);
    name2.appendChild(nameText2);
    newPage2.appendChild(name2);


     var name3 = document.createElement("h4");
    var nameText3 = document.createTextNode("Email: " + email);
    name3.appendChild(nameText3);
    newPage3.appendChild(name3);

     var name4 = document.createElement("h4");
    var nameText4 = document.createTextNode("Phone: " + phone);
    name4.appendChild(nameText4);
    newPage4.appendChild(name4);

     var name5 = document.createElement("h4");
    var nameText5 = document.createTextNode("Item Name: " + item_name);
    name5.appendChild(nameText5);
    newPage5.appendChild(name5);

     var name6 = document.createElement("h4");
    var nameText6 = document.createTextNode("Item Description: " + item_desc);
    name6.appendChild(nameText6);
    newPage6.appendChild(name6);

     var name7 = document.createElement("h4");
    var nameText7 = document.createTextNode("Brand: " + brand);
    name7.appendChild(nameText7);
    newPage7.appendChild(name7);

     var name8 = document.createElement("h4");
    var nameText8 = document.createTextNode("Category: " + category);
    name8.appendChild(nameText8);
    newPage8.appendChild(name8);

     var name9 = document.createElement("h4");
    var nameText9 = document.createTextNode("Condition: " + condition);
    name9.appendChild(nameText9);
    newPage9.appendChild(name9);


     var name10 = document.createElement("h4");
    var nameText10 = document.createTextNode("Branch: " + branch);
    name10.appendChild(nameText10);
    newPage10.appendChild(name10);

     var name11 = document.createElement("h4");
    var nameText11 = document.createTextNode("Loan Amount: " + loanamount);
    name11.appendChild(nameText11);
    newPage11.appendChild(name11);

    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", "image-canvas");
    newPage.appendChild(canvas);
    reviewPage.appendChild(newPage);
    drawImage(imageSavedURI);

    var submitButton = document.createElement("button");
    submitButton.setAttribute("class", "w-button action-button");
    submitButton.setAttribute("onclick", "uploadPhoto()");
    var submitButtonText = document.createTextNode("Submit");
    submitButton.appendChild(submitButtonText);
    reviewPage.appendChild(submitButton);
}