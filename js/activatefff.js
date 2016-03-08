$('form').submit(function(){
    var postData = $(this).serialize();

	var form	= $('form');
	var submit 	= $('#activate');
	var alert	= $('.w-form-done');

	// validate form
	form.validate({
		// validation rules
		rules: {
			// name field (required , minimum length 3)
			firstname: {
				required: true,
				minlength: 3
			},
			lastname: {
				required: true,
				minlength: 3
			},
			phone: {
				required: true,
				minlength: 10
			},
			// password field (required , minimum length 6, max 16)
			password: {
				required: true,
				minlength: 6,
				maxlength: 16
			},
			// password2 field must be equal to password field
			cpassword: {
				equalTo: '#password'
			},
			// email field only required
			email: 'required'
		},
		// submit ajax request
		submitHandler: ajaxSubmit
	});

	/**
	* ajax submit function
	* sending simple ajax request
	**/

	function ajaxSubmit() {
		$.ajax({
			url: 'http://moneybox.envisiongh.net/activate.php',
			crossDomain: true,
			type: 'POST',
			dataType: 'jsonp',
			// form serialize data
			data: postData,
			beforeSend: function(){
				$("#activate").val('Activating account now...');
			},
			success: function(data){
				if ( data.status === 'success' ) {
					// if response status == success redirect to success page
					//$(location).attr('href','success.html');
					$(".w-form-done").css("display", "block");
						$(".w-form-done").css("margin-bottom", "15px");
						$(".w-form-done").css("padding", "10px");
						$(".w-form-done").css("background-color", "#00b233");
						$(".w-form-done").html('<p style="color: #ffffff;">You have successfully activated your account.<br> You can now login</p>');
						var delay = 4000; //Your delay in milliseconds
						var URL = "login.html";
						setTimeout(function(){ window.location = URL; }, 4000);
						// $( "#change" ).hide();
						// $( "#showactivationpage" ).load("activate.html" ).fadeIn('500');
				} else {
					// not success! show error messages
					// alert.html(data.status).fadeIn();
					// submit.val('Sign Up').removeAttr('disabled');
					$(".w-form-done").css("display", "block");
						$(".w-form-done").css("margin-bottom", "15px");
						$(".w-form-done").css("padding", "10px");
						$(".w-form-done").css("background-color", "#E21C3C");
						$(".w-form-done").html('<p style="color: #ffffff;">Sorry, looks like something went wrong</p>');
				}
			},
			error: function(){
				// show error message
				// alert.html('Sending request fail').fadeIn();
				// submit.val('Sign Up').removeAttr('disabled');
				$(".w-form-done").css("display", "block");
						$(".w-form-done").css("margin-bottom", "15px");
						$(".w-form-done").css("padding", "10px");
						$(".w-form-done").css("background-color", "#E21C3C");
						$(".w-form-done").html('<p style="color: #ffffff;">Error: Sorry we could not activate your account</p>');
			}
		});
	};
	return false;
});