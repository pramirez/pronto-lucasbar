$(document).ready(function(){ 
	$("#entertainerForm").validate({		
		ignore: "",
		rules: {
			over18: { required: true }
		},
		messages: {
			firstname: "Please enter your first name",
			lastname: "Please enter your last name",			
			phone: "Please enter your cell phone + area code",			
			email: "Please enter a valid email address"
		},
		errorPlacement: function (error, element) {			
			if (element.attr("name") == "over18")
				$("#over18").addClass("error-label");			
			else if (Number($("#entertainerForm").attr("submits")) > 1)
				error.insertAfter(element);
			else
				return false;
		},
		unhighlight: function (element, errorClass) {			
			if ($(element).attr("name") == "over18")
				$("#over18").removeClass("error-label");			
			else
				$(element).removeClass("error");
		},
		invalidHandler: function() {
			$(this).attr("submits", Number($(this).attr("submits"))+1);			
		},
		submitHandler:function(form){ 
			$(form).attr("valid-submits", Number($(form).attr("valid-submits"))+1);
			
			$('#preloader').fadeTo('fast', 0.7, function () {
				// $(this).remove();
			});
		
			// if(Number($(form).attr("valid-submits")) == 1){
				//form.submit(); 				

				var data = new FormData();
					data.append('moduleID', $("#moduleID").val());
					data.append('firstname', $("#firstname").val());
					data.append('lastname', $("#lastname").val());
					data.append('countryCode', $("#countryCode").val());
					data.append('phone', $("#phone").val());
					data.append('email', $("#email").val());
					data.append('address1', $("#address1").val());
					data.append('address2', $("#address2").val());
					data.append('over18', $("#over18chk").val());

				// console.log(getAJaxURL('/inc/modules/mod_employmentForm_act.cfm'));
				
				$.ajax({  
					type: 'POST',
					url: getAJaxURL('/inc/modules/mod_entertainerForm_act.cfm'),
					data: data,
					processData: false,
					contentType: false,
					dataType: 'json'
				}).done(function(r) {
					
					// console.log('r: ',r);
					
					$('#preloader').fadeOut('slow', function () {
						// $(this).remove();
					});
					
					if(Number(r.SUCCESS) == 1){
						$(form).fadeOut(400, function(){
							$(this).next().fadeIn(200);
						});
					}else{
					
						var msg = 'Oops, we have encountered an error submitting your request.\n\nPlease check the information you provided and remove any non-standard characters such as emojis and and any other non-alphanumeric characters.\n\nIf this problem persists, please contact.html the club directly.';
						
						if(Number(r.ERRORNO) == 2){
							msg = '';
						}else if(Number(r.ERRORNO) == 3){
							msg = 'Oops, we have encountered an error submiting your request.\n\nPlease check the information you provided and remove any non-standard characters such as emojis and and any other non-alphanumeric characters.\n\nIf this problem persists, please contact.html the club directly.';
						}
						
						alert(msg);
					}					
					
				}).fail(function(xhr, status, error){
					
					/*var err = xhr.responseText;
					console.log('e1: ',err);
					console.log('e2: ',status);
					console.log('e3: ',error);*/
					
					$('#preloader').fadeOut('slow', function () {
						// $(this).remove();
					});
					
					var msg = 'Oops, we have encountered an error submiting your request.\n\nPlease check the information you provided and remove any non-standard characters such as emojis and and any other non-alphanumeric characters.\n\nIf this problem persists, please contact.html the club directly.';
					
					alert(msg);
				});			
			//}
			
			return false;
		}
	});
});
