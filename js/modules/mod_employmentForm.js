$.validator.addMethod("position", function(value, element, arg){	
	if(value == undefined)
		return false;
	else
	{
		$("#position").css("color", "inherit");		
		return true;
	}
}, "You must choose at leat one position");

$.validator.addMethod("haveExperience", function(value, element, arg){	
	if(value == undefined)
		return false;
	else
	{
		$("#haveExperience").css("color", "inherit");		
		return true;
	}
}, "You must choose yes or no");

$(document).ready(function(){ 
	$("#employmentForm").validate({		
		ignore: "",
		rules: {
			position: { required: true },
			over18: { required: true },
			haveExperience: { required: true }
		},
		messages: {
			firstname: "Please enter your first name",
			lastname: "Please enter your last name",			
			phone: "Please enter your cell phone + area code",			
			email: "Please enter a valid email address",
			address1: "Please enter your address",
			city: "Please enter your city",
			state: "Please enter your state",
			zip: "zip code"
		},
		errorPlacement: function (error, element) {			
			if (element.attr("name") == "over18")
				$("#over18").addClass("error-label");
			else if (element.attr("name") == "position")
				$("#position").addClass("error-label");
			else if (element.attr("name") == "haveExperience")
				$("#haveExperience").addClass("error-label");
			else if (Number($("#employmentForm").attr("submits")) > 1)
				error.insertAfter(element);
			else
				return false;
		},
		unhighlight: function (element, errorClass) {			
			if ($(element).attr("name") == "over18")
				$("#over18").removeClass("error-label");
			else if ($(element).attr("name") == "position")
				$("#position").removeClass("error-label");
			else if ($(element).attr("name") == "haveExperience")
				$("#haveExperience").removeClass("error-label");
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
				var position = [];

				$.each($("input:checkbox[name=position]:checked"), function(){
					position.push($(this).val());
				});

				var data = new FormData();
					data.append('moduleID', $("#moduleID").val());
					data.append('firstname', $("#firstname").val());
					data.append('lastname', $("#lastname").val());
					data.append('countryCode', $("#countryCode").val());
					data.append('phone', $("#phone").val());
					data.append('email', $("#email").val());
					data.append('address1', $("#address1").val());
					data.append('address2', $("#address2").val());				
					data.append('city', $("#city").val());
					data.append('state', $("#state").val());
					data.append('zip', $("#zip").val());				
					data.append('position', position.join(","));
					data.append('haveExperience', $("input:radio[name=haveExperience]:checked").val());
					data.append('comment', $("#comment").val());				
					if($('#bodyShot').length){
						data.append('file_bodyShot', ($('input[type=file]')[0].files[0] == undefined)?'':$('input[type=file]')[0].files[0]);
						data.append('file_resume', ($('input[type=file]')[1].files[0] == undefined)?'':$('input[type=file]')[1].files[0]);
					}else{
						data.append('file_resume', ($('input[type=file]')[0].files[0] == undefined)?'':$('input[type=file]')[0].files[0]);
					}					
					// data.append('file_myID', $('input[type=file]')[1].files[0]);								
					data.append('over18', $("#over18chk").val());

				// console.log(getAJaxURL('/inc/modules/mod_employmentForm_act.cfm'));
				
				$.ajax({  
					type: 'POST',
					url: getAJaxURL('/inc/modules/mod_employmentForm_act.cfm'),
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
					
						var msg = 'Oops, we have encountered an error submiting your employment request.\n\nPlease check the information you provided and remove any non-standard characters such as emojis and and any other non-alphanumeric characters.\n\nAlso, if you uploaded any files, please remove all non-standard characters from the filename(s) and make sure your file(s) have an extension that corresponds to either an image, pdf or word document. All other file types will be rejected.\n\nIf this problem persists, please contact.html the club directly to submit your employment application.';
						
						if(Number(r.ERRORNO) == 2){
							msg = 'Opps, we were unable to upload your attachment(s).\n\nPlease remove all non-standard characters from the filename(s) and make sure your file(s) have an extension that corresponds to either an image, pdf or word document. All other file types will be rejected.\n\nIf this problem persists, please contact.html the club directly to submit your employment application.';
						}else if(Number(r.ERRORNO) == 3){
							msg = 'Oops, we have encountered an error submiting your employment request.\n\nPlease check the information you provided and remove any non-standard characters such as emojis and and any other non-alphanumeric characters.\n\nIf this problem persists, please contact.html the club directly to submit your employment application.';
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
					
					var msg = 'Oops, we have encountered an error submiting your employment request.\n\nPlease check the information you provided and remove any non-standard characters such as emojis and and any other non-alphanumeric characters.\n\nAlso, if you uploaded any files, please remove all non-standard characters from the filename(s) and make sure your file(s) have an extension that corresponds to either an image, pdf or word document. All other file types will be rejected.\n\nIf this problem persists, please contact.html the club directly to submit your employment application.';
					
					alert(msg);
				});			
			//}
			
			return false;
		}
	});
});
