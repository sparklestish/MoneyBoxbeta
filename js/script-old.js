$('form').submit(function(){
    var postData = $(this).serialize();

	var form	= $('form');
	var submit 	= $('#signup');
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
			url: 'http://envisiongh.net/moneyboxserver/ajax.php',
			crossDomain: true,
			type: 'POST',
			dataType: 'json',
			// form serialize data
			data: postData,
			beforeSend: function(){
				alert.fadeOut();
				submit.val('Sending...').attr('disabled', 'disabled');
			},
			success: function(data){
				if ( data.status === 'success' ) {
					// if response status == success redirect to success page
					$(location).attr('href','success.html');
				} else {
					// not success! show error messages
					alert.html(data.status).fadeIn();
					submit.val('Sign Up').removeAttr('disabled');
				}
			},
			error: function(){
				// show error message
				alert.html('Sending request fail').fadeIn();
				submit.val('Sign Up').removeAttr('disabled');
			}
		});
	};
	return false;
});