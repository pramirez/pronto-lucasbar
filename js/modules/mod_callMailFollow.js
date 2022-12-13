$(document).ready(function(){ 
	$("#callMailFollowForm").validate({		
		rules: {
			name: {
				required: true
			},
			email: {
				required: true,
				email: true
			},
			message: {
				required: true
			}
		},
		messages: {
			name: "Please enter your name",
			email: "Please enter a valid email address",					
			message: "Please enter a message"
		},
		errorPlacement: function (error, element) {			
			if (Number($("#callMailFollowForm").attr("submits")) > 1)
				error.insertAfter(element);
			else
				return false;
		},
		invalidHandler: function() {
			$(this).attr("submits", Number($(this).attr("submits"))+1);			
		},
		submitHandler:function(form){						
			var data = new FormData();
				data.append('moduleID', $("#moduleID").val());
				data.append('name', $("#name").val());
				data.append('email', $("#email").val());
				data.append('comment', $("#message").val());
			
				if ($('#offers').is(":checked"))
				{
				  data.append('offers', 1);
				}			
			
			$.ajax({  
				type: 'POST',
				url: getAJaxURL('/inc/modules/mod_callMailFollow_act.cfm'),
				data: data,
				processData: false,
  				contentType: false
			}).done(function(data) {
				$('.contact.html-form-row').fadeOut(400, function(){
					$(this).next().fadeIn(200);
				});
			}).fail(function(){
				alert('Whoops! This didn\'t work. Please contact.html us.')
			});
			
			return false;
		}
	});
});
