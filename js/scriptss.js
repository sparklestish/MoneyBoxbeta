/*
Author: Pradeep Khodke
URL: http://www.codingcage.com/
*/

$('document').ready(function()
{ 
     /* validation */
	 $("#loginform").validate({
      rules:
	  {
			password: {
			minlength: 8,
			required: true,
			},
			phone: {
            required: true,
            minlength: 10            
            },
	   },
       messages:
	   {
            password:{
                      required: "please enter your password",
                      required: "password should be at least 8 characters"
                     },
            tel: "please enter your valid phone number",
       },
	   submitHandler: submitForm	
       });  
	   /* validation */
	   
	   /* login submit */
	   function submitForm()
	   {		
			var data = $("#loginform").serialize();
				
			$.ajax({
				
			type : 'POST',
			url  : 'http://envisiongh.net/moneyboxserver/login_process.php',
			data : data,
			beforeSend: function()
			{	
				$("#w-form-done").fadeOut();
				$("#btn_login").html('&nbsp; sending ...');
			},
			success :  function(response)
			   {						
					if(response=="ok"){
									
						$("#btn_login").html('<img src="btn-ajax-loader.gif" /> &nbsp; Signing In ...');
						setTimeout(' window.location.href = "home.php"; ',4000);
					}
					else{
									
						$("#w-form-done").fadeIn(1000, function(){						
				$("#w-form-done").html(' &nbsp; '+response+' !');
											$("#btn_login").html('&nbsp; Sign In');
									});
					}
			  }
			});
				return false;
		}
	   /* login submit */
});