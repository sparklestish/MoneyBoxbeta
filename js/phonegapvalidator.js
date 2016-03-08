    var deviceReady = false;
    function init() {
        document.addEventListener("deviceready", function () {
            deviceReady = true;
        }, false);

        window.setTimeout(function () {
            if (!deviceReady) {
                alert("Error: App did not initialize.  Features Of App will not run correctly.");
                console.log("Error: App did not initialize.  Features Of App will not run correctly.");
            }
        }, 1000);
    }


    /**
     * Take picture with camera
     */
    function takePicture() {
        navigator.camera.getPicture(
            function(uri) {
                var img = document.getElementById('camera_image');
                img.style.visibility = "visible";
                img.style.display = "block";
                img.src = uri;
                document.getElementById('camera_status').innerHTML = "Picture Taken Successfully";
            },
            function(e) {
                console.log("Error getting picture: " + e);
                document.getElementById('camera_status').innerHTML = "Error getting picture.";
            },
            { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI});
    };

    /**
     * Select picture from library
     */
    function selectPicture() {
        navigator.camera.getPicture(
            function(uri) {
                var img = document.getElementById('camera_image');
                img.style.visibility = "visible";
                img.style.display = "block";
                img.src = uri;
                document.getElementById('camera_status').innerHTML = "Picture Selected Successfully";
            },
            function(e) {
                console.log("Error getting picture: " + e);
                document.getElementById('camera_status').innerHTML = "Error getting picture.";
            },
            { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY});
    };
    
    /**
     * Upload current picture
     */
    function uploadPicture() {
      
      // Get URI of picture to upload
        var img = document.getElementById('camera_image');
        var imageURI = img.src;
        if (!imageURI || (img.style.display == "none")) {
            document.getElementById('camera_status').innerHTML = "Take picture or select picture from library first.";
            return;
        }
        
        // Verify server has been entered
        server = document.getElementById('serverUrl').value;
        if (server) {
          
            // Specify transfer options
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
            options.chunkedMode = false;

            // Transfer picture to server
            var ft = new FileTransfer();
            ft.upload(imageURI, server, function(r) {
                document.getElementById('camera_status').innerHTML = "Upload successful: "+r.bytesSent+" bytes uploaded.";              
            }, function(error) {
                document.getElementById('camera_status').innerHTML = "Upload failed: Code = "+error.code;             
            }, options);
        }
    }

    /**
     * View pictures uploaded to the server
     */ 
    function viewUploadedPictures() {
      
      // Get server URL
        server = document.getElementById('serverUrl').value;
        if (server) {
          
            // Get HTML that lists all pictures on server using XHR 
            var xmlhttp = new XMLHttpRequest();

            // Callback function when XMLHttpRequest is ready
            xmlhttp.onreadystatechange=function(){
                if(xmlhttp.readyState === 4){

                    // HTML is returned, which has pictures to display
                    if (xmlhttp.status === 200) {
                      document.getElementById('server_images').innerHTML = xmlhttp.responseText;
                    }

                    // If error
                    else {
                      document.getElementById('server_images').innerHTML = "Error retrieving pictures from server.";
                    }
                }
            };
            xmlhttp.open("GET", server , true);
            xmlhttp.send();         
        } 
    }
    
    /**
     * Function called when page has finished loading.
     */

    
 document.addEventListener("deviceready", init, false);
 
 document.addEventListener("online", toggleCon, false);
  document.addEventListener("offline", toggleCon, false);
 
  if(navigator.network.connection.type == Connection.NONE) {
    navigator.notification.alert("Sorry, you are offline.", function() {}, "Offline!");
  } else {
    setupButtonHandler();
  }

 
function toggleCon(e) {
  console.log("Called",e.type);
  if(e.type == "offline") {
    $("#searchBtn").off("touchstart").attr("disabled","disabled");
    navigator.notification.alert("Sorry, you are offline.", function() {}, "Offline!");
  } else {
    $("#searchBtn").removeAttr("disabled");
    navigator.notification.alert("Woot, you are back online.", function() {}, "Online!");
    setupButtonHandler();
  }
}
