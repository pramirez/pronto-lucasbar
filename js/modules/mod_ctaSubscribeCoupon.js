$(document).ready(function(){ 
	$(".ctaSubscribeForm").each(function(){
        $(this).validate({		
            rules: {
                name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                email: "Please enter a valid email address"
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.next());
            },
            invalidHandler: function(event, validator) {			
                $(this).attr("submits", Number($(this).attr("submits"))+1);			
            },
            submitHandler:function(form){				
                var data = new FormData();
                    data.append('moduleID', $(form).find('input[name="moduleID"]').val());				
                    data.append('email', $(form).find('input[name="email"]').val());

                    if($(form).find('input[name="name"]').val() != undefined){
                        data.append('name', $(form).find('input[name="name"]').val());
                    }

                $.ajax({  
                    type: 'POST',
                    url: getAJaxURL('/inc/modules/mod_ctaSubscribeCoupon_act.cfm'),
                    data: data,
                    processData: false,
                    contentType: false
                }).done(function(data) {			
                    $(form).parent().fadeOut(400, function(){
                        $(this).next().fadeIn(200);
                    });	
                }).fail(function(){});

                return false;
            }
        });
    });
});