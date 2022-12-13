$(document).ready(function(){ 
	$("#footer1-contactform").validate({		
		rules: {
			name: {
				required: true
			},
			email: {
				required: true,
				email: true
			},
			comment: {
				required: true
			}
		},
		messages: {
			email: "Please enter a valid email address"
		},
		errorPlacement: function (error, element) {
			if(Number($(this.currentForm).attr("submits")) > 1)
				error.insertAfter(element);
			else{
				return false;
			}
			console.log($(this.currentForm));
		},
		invalidHandler: function(event, validator) {			
			$(this).attr("submits", Number($(this).attr("submits"))+1);			
		},
		submitHandler:function(form){				
			var data = new FormData();
				data.append('name', $(form).find('input[name="name"]').val());
				data.append('email', $(form).find('input[name="email"]').val());
				data.append('comment', $(form).find('textarea[name="comment"]').val());
			
				if ($('#offers').is(":checked"))
				{
				  data.append('offers', 1);
				}
			
			$.ajax({  
				type: 'POST',
				url: getAJaxURL('/inc/modules/mod_footer1_act.cfm'),
				data: data,
				processData: false,
  				contentType: false
			}).done(function(data) {			
				$(form).fadeOut(400, function(){
					$(form).next().fadeIn(200);
				});	
			}).fail(function(){});
			
			return false;
		}
	});
});