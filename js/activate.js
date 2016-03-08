$(document).ready(function(){

$("#activate").click(function(){

	var phone = $("#phone").val();
	var code = $("#code").val();
	
	
	if( phone =='' || code =='')
		{
		$(".w-form-done").css("display", "block");
						$(".w-form-done").css("margin-bottom", "15px");
						$(".w-form-done").css("padding", "10px");
						$(".w-form-done").css("background-color", "#E21C3C");
						$(".w-form-done").html('<p style="color: #ffffff;">Please fill all the fields</p>');
						setTimeout(function() {
						$('.w-form-done').fadeOut('slow');
						}, 30000);
						$("#activate").val('Activate My Account');
		}		
	else 
	   {
	     $.post("http://moneyboxapp.envisiongh.net/activate.php",{ phone1: phone, code1: code},
		  function(data) {
		   if(data=='success')
		   {
			$("form")[0].reset();
			$(".w-form-done").css("display", "block");
						$(".w-form-done").css("margin-bottom", "15px");
						$(".w-form-done").css("padding", "10px");
						$(".w-form-done").css("background-color", "#00b233");
						$(".w-form-done").html('<p style="color: #ffffff;">Your Account has been successfully activated');
						var delay = 2000; //Your delay in milliseconds
						var URL = "login.html";
						setTimeout(function(){ window.location = URL; }, 2000);
		   } else{
				$(".w-form-done").css("display", "block");
						$(".w-form-done").css("margin-bottom", "15px");
						$(".w-form-done").css("padding", "10px");
						$(".w-form-done").css("background-color", "#E21C3C");
						$(".w-form-done").html('<p style="color: #ffffff;">There has been an error in activating your account.<br> please contact support</p>');
						setTimeout(function() {
						$('.w-form-done').fadeOut('slow');
						}, 30000);
						$("#activate").val('Activate My Account');
		   }
		});
	   }
	
	});

});
