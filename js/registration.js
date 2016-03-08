$(document).ready(function(){

$("#register").click(function(){

	var firstname = $("#firstname").val();
	var lastname = $("#lastname").val();
	var email = $("#email").val();
	var phone = $("#phone").val();
	var password = $("#password").val();
	var cpassword = $("#cpassword").val();
	
	if( firstname =='' || lastname =='' || email =='' || phone =='' || password =='' || cpassword =='')
		{
		$(".w-form-done").css("display", "block");
						$(".w-form-done").css("margin-bottom", "15px");
						$(".w-form-done").css("padding", "10px");
						$(".w-form-done").css("background-color", "#E21C3C");
						$(".w-form-done").html('<p style="color: #ffffff;">Please fill all the fields</p>');
						setTimeout(function() {
						$('.w-form-done').fadeOut('slow');
						}, 30000);
						$("#register").val('Register');
		}	
	else if((password.length)<8)
		{
				$(".w-form-done").css("display", "block");
						$(".w-form-done").css("margin-bottom", "15px");
						$(".w-form-done").css("padding", "10px");
						$(".w-form-done").css("background-color", "#E21C3C");
						$(".w-form-done").html('<p style="color: #ffffff;">Password should be at least 8 characters long</p>');
						setTimeout(function() {
						$('.w-form-done').fadeOut('slow');
						}, 30000);
						$("#register").val('Register');
		}
		
	else if(!(password).match(cpassword))
		{
				$(".w-form-done").css("display", "block");
						$(".w-form-done").css("margin-bottom", "15px");
						$(".w-form-done").css("padding", "10px");
						$(".w-form-done").css("background-color", "#E21C3C");
						$(".w-form-done").html('<p style="color: #ffffff;">Your passwords do not match. please try again</p>');
						setTimeout(function() {
						$('.w-form-done').fadeOut('slow');
						}, 30000);
						$("#register").val('Register');
		} 
	
	else 
	   {
	   $("#register").val('validating your info...');
		 $.post("http://moneyboxapp.envisiongh.net/register.php",{ firstname1: firstname, lastname1: lastname, email1: email, phone1: phone, password1:password},
		  function(data) {
		   if(data=='success')
		   {
			$("form")[0].reset();
			$(".w-form-done").css("display", "block");
						$(".w-form-done").css("margin-bottom", "15px");
						$(".w-form-done").css("padding", "10px");
						$(".w-form-done").css("background-color", "#00b233");
						$(".w-form-done").html('<p style="color: #ffffff;">Thank you for Registering with us! <br> Please activate your account now</p>');
						var delay = 2000; //Your delay in milliseconds
						var URL = "activate.html";
						setTimeout(function(){ window.location = URL; }, 2000);
		   } else if(data=='exist'){
				$(".w-form-done").css("display", "block");
						$(".w-form-done").css("margin-bottom", "15px");
						$(".w-form-done").css("padding", "10px");
						$(".w-form-done").css("background-color", "#E21C3C");
						$(".w-form-done").html('<p style="color: #ffffff;">The email or phone number is already registered, Please try another</p>');
						setTimeout(function() {
						$('.w-form-done').fadeOut('slow');
						}, 30000);
						$("#register").val('Register');
		   }
		   else if(data=='error'){
				$(".w-form-done").css("display", "block");
						$(".w-form-done").css("margin-bottom", "15px");
						$(".w-form-done").css("padding", "10px");
						$(".w-form-done").css("background-color", "#E21C3C");
						$(".w-form-done").html('<p style="color: #ffffff;">There has been an error. Contact Support</p>');
						setTimeout(function() {
						$('.w-form-done').fadeOut('slow');
						}, 30000);
						$("#register").val('Register');
		   }
		});
	   }
	
	});

});
