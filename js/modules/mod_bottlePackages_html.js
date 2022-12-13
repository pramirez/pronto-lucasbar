Date.prototype.withoutTime = function () {
    var d = new Date(this);
    d.setHours(0, 0, 0, 0);
    return d;
}

Date.prototype.adjust = function(part, amount){
	part = part.toLowerCase();
	
	var map = { 
				years: 'FullYear', months: 'Month', weeks: 'Hours', days: 'Hours', hours: 'Hours', 
				minutes: 'Minutes', seconds: 'Seconds', milliseconds: 'Milliseconds',
				utcyears: 'UTCFullYear', utcmonths: 'UTCMonth', weeks: 'UTCHours', utcdays: 'UTCHours', 
				utchours: 'UTCHours', utcminutes: 'UTCMinutes', utcseconds: 'UTCSeconds', utcmilliseconds: 'UTCMilliseconds'
			},
		mapPart = map[part];

	if(part == 'weeks' || part == 'utcweeks')
		amount *= 168;
	if(part == 'days' || part == 'utcdays')
		amount *= 24;
	
	this['set'+ mapPart]( this['get'+ mapPart]() + amount );

	return this;
}

Date.prototype.each = function(endDate, part, step, fn, bind){
	var fromDate = new Date(this.getTime()),
		toDate = new Date(endDate.getTime()),
		pm = fromDate <= toDate? 1:-1,
		i = 0;

	while( (pm === 1 && fromDate <= toDate) || (pm === -1 && fromDate >= toDate) ){
		if(fn.call(bind, fromDate, i, this) === false) break;
		i += step;
		fromDate.adjust(part, step*pm);
	}
	return this;
}

let party_size;

function checkPickupTime(){
    return true;
}
function copyNameToCCName()
{
	if($("#cc_Name").attr("isSet")=='false' && ($("#firstname").val().length && $("#lastname").val().length))
	{
		$("#cc_Name").val($("#firstname").val() + ' ' + $("#lastname").val());
		
		$("#cc_Name").attr('isSet',true);
	}
}

function haveOwnRide(har)
{
	if(har)
	{
		var haveRide = confirm('If you plan on using your own transportation, make sure you either get dropped off or valet at the back door to avoid paying cover. Please have your receipt in hand.');
		
		if(!haveRide)
		{
			$("#haveARide").attr('checked', false);		
		}
		else
		{
			$("#f-pickup-location").append($("<option></option>").attr("value", "135_Personal Transportation").text("Personal Transportation")).val("135_Personal Transportation");
		}
	}
	else
		$("#f-pickup-location option[value='135_Personal Transportation']").remove();
}

function showSpecial(s)
{
	$("#specialsNav li").removeClass("active");
	$("#specialNav_"+s).addClass("active");
	
	$(".activeSpecial").removeClass("activeSpecial").addClass("hidden");	
	$("#special_"+s).removeClass("hidden").addClass("activeSpecial");
	
	return false;
}

function expandFAQ(faq)
{		
	$("a[name='" + faq + "']").each(function(){
		$(this).parent(".showhide").find(".show-content").slideDown();
	});
}

function updateQuantityTotal()
{
	var optionsValue = 0;
	
	$(".product-options").each(function(){
		optionsValue = optionsValue + Number($(this).val().split("|")[0].split("_")[1]);
	});
    
    var subtotal = Number($("#baseprice").val()) + optionsValue * Number($("#quantity").val()),
        taxes = subtotal * (Number($("#basetax").val()) * .01),
        gratuity = subtotal * (Number($("#basegratuity").val()) * .01),
        total = subtotal + (taxes + gratuity),
        itemProcessingFee = 0,
        itemProcessingFeeTotal = 0;
    
    if(Number($("#baseprocessingfee").val())){
        itemProcessingFee = total*Number($("#baseprocessingfee").val())*.01;
    }
    itemProcessingFeeTotal = itemProcessingFee+Number($("#baseprocessingfeeflat").val());
    total = total+itemProcessingFeeTotal;
                
    $("#subtotal").html(priceformatter.format(subtotal));
			
    if($("#taxes").length > 0)
        $("#taxes").html(priceformatter.format(taxes));

    if($("#gratuity").length > 0)
        $("#gratuity").html(priceformatter.format(gratuity));
        
    if($("#processing-fee").length > 0)
        $("#processing-fee").html(priceformatter.format(itemProcessingFeeTotal));

    $("#price").html(priceformatter.format(total));
	
	/* if(typeof party_size.attr("readonly") !== 'undefined')
		party_size.val(quantity); */		
}

function getPartySizeWarningLevel(party_size)
{
	var	packageSize = Number(party_size.attr("packagesize")),
		packageSizeMax = Number(party_size.attr("maxpackagesize")),
		partySize = Number(party_size.val());
	
	if(partySize > packageSizeMax)
	{
		return 3;
	}
	
	return 0;
}

function setPartySizeWarningLevel(party_size)
{		
	var l = getPartySizeWarningLevel(party_size);
	
	for(var w=0; w<4; w++)
	{
		if(w==l)
			party_size.closest(".pswarn"+w).show();
		else
			party_size.closest(".pswarn"+w).hide();
	}
	
	return true;
}

function hidePartySizeWarning()
{
	if(partySizeDialog.dialog("isOpen"))
        partySizeDialog.dialog("close");
	
	return false;
}

function showPartySizeWarning(party_size)
{	
	setPartySizeWarningLevel(party_size);
	
	partySizeDialog.dialog("open");
	
	return false;
}

function togglePartySizeWarning()
{
	if(!partySizeDialog.dialog("isOpen"))
		showPartySizeWarning(party_size);
	else
		hidePartySizeWarning();
		
	return false;
}

function validatePartySize(party_size)
{
	var l = getPartySizeWarningLevel(party_size);
	
	if(l > 0)
		showPartySizeWarning(party_size);
	else
		hidePartySizeWarning();
}

function checkServerTime()
{	
	var srvDate = "";
	
	$.ajax({
		type: "get",
		url: getAJaxURL('/shop-checkServerTime.cfm'),
		dataType: "json",
		cache: false,
		async: false,
		success: function(r)
		{
			srvDate = r.SRVNOW;
		},
		error: function(e) 
		{
			console.log("error: ", e);
		}
	});
	
	return srvDate;
}

$.validator.addMethod("isEmail", function(value, element, arg){	
	return (($(element).hasClass("notPaypal") && $("#cc_Type").val() == "Paypal") ? true : echeck($(element).val()));
}, "Please enter a valid email address");

$.validator.addMethod("isCVV", function(value, element, arg){		
	return (($(element).hasClass("notPaypal") && $("#cc_Type").val() == "Paypal") ? true : (value.length >= 3 && value.length <= 4 && !isNaN($(element).val())));
}, "Please enter a valid credit card cvv");

$.validator.addMethod("isCreditCardNumber", function(value, element, arg){		
	return (($(element).hasClass("notPaypal") && $("#cc_Type").val() == "Paypal") ? true : isValidCreditCardNumber($(element).val()));
}, "Please enter a valid credit card number");

$.validator.addMethod("checkPaypal", function(value, element, arg){		
	if($(element).hasClass("notPaypal") && $("#cc_Type").val() == "Paypal")
		return true;
	else if (value.length > 0)
		return true;
	else
		return false;
}, "This field is required");

$.validator.addClassRules('over18Class',{
	required: true
});
$(document).ready(function(){
	var filename = window.location.href.split('/').pop().split('#')[0].split('?')[0];
	var afid = typeof (getAllUrlParams(window.location.href).foo0) === 'undefined' ? (filename === 'checkout.html') ? undefined : getAllUrlParams(window.location.href).foo : getAllUrlParams(window.location.href).foo0;
	
	if(typeof (afid) !== 'undefined'){
		setCookie('myfriendlink', afid, 30);
	}
	
	if($('#affiliateID').length && getCookie('myfriendlink').length){
		$('#affiliateID').val(getCookie('myfriendlink'));
	}
	
	$("#cartitemform").validate({		
		ignore: "",
		rules: {			
			pickupNumber: { digits: true },			
			pickupTime: { required: true },
			cc_Name: { checkPaypal: true },
			cc_Number: { isCreditCardNumber: true },
			cc_Month: { checkPaypal: true },
			cc_Year: { checkPaypal: true },
			cc_CVV: { isCVV: true },
			address1: { checkPaypal: true },
			city: { checkPaypal: true },
			state: { checkPaypal: true },
			zip: { checkPaypal: true },
			cc_country: { checkPaypal: true },
			cc_email: { isEmail: true },
			cc_phone1: { checkPaypal: true }
		},
		messages: {
			firstname: "Please enter your first name",
			lastname: "Please enter your last name",
			pickupNumber: "Please enter the number of guests in your party",
			pickupDate: "Please choose an arrival date",
			pickupTime: "Please choose an arrival time",
			phone1: "Please enter your cell phone + area code",
			cc_Name: "Please enter the name on your credit card",
			cc_Number: "Please enter a valid credit card number",
			cc_Month: "Please select month",
			cc_Year: "Please select year",
			cc_CVV: "Please enter security code",
			address1: "Please enter your address",
			city: "Please enter your city",
			state: "Please enter your state",
			zip: "zip code",
			cc_country: "Please select your country",
			cc_email: "Please enter a valid email address",
			cc_phone1: "Please enter your day phone + area code"
		},
		errorPlacement: function (error, element) {			
			if (element.attr("name") == "over18")
				$(".over18").addClass("error-label");
			else if (Number($("#cartitemform").attr("submits")) > 1)
				error.insertAfter(element);
			else
				return false;
		},
		unhighlight: function (element, errorClass) {			
			if($(element).attr("name")  == "over18")
				$(".over18").removeClass("error-label");
			else
				$(element).removeClass("error");
		},
		invalidHandler: function() {
			$(this).attr("submits", Number($(this).attr("submits"))+1);			
		},
		submitHandler:function(form){ 
            $('#preloader').fadeIn('fast', function(){});
            var options = { 
                url: getAJaxURL('/checkout_html_act.cfm')+'?'+window.location.href.slice(window.location.href.indexOf('?')+1),
                crossDomain: true,
                type: "POST",
                dataType: "json",
                success: function(r) { 
                    if($("#cc_Type").val() != 'Paypal')
                        $('#preloader').fadeOut('slow', function(){});
                    
                    if(Number(r.SUCCESS) == 1){
                        document.location = r.MESSAGE;
                    }else{
                        $("#checkoutError").html(r.MESSAGE);
                        $('#checkoutModal').modal({
                            backdrop: 'static'
                        });
                    }
                },
                error: function(){
                    $('#preloader').fadeOut('slow', function(){});
                    $("#checkoutError").html("Temporarily unable to process request. Please try again.");
                    $('#checkoutModal').modal({
                        backdrop: 'static'
                    });
                }
            };
            var form = $(form).ajaxSubmit(options);
        }
	});
	
	$("#partyDate").datepicker({ minDate:0 });
	
	partySizeDialog = $(".partysize-results").dialog({ 
		autoOpen: false,
		modal: false,
		width: $(".party_size").width(),		
		maxHeight: 585,
		open: function(e, ui){ $(".party_size").focus(); },
		position: { my: "left top", at: "left bottom", of: $(".party_size") }
	}).on('keyup click', function(e){ e.stopPropagation(); });
	
	$(".party_size").on("keyup click", function(e){			
		e.stopPropagation();
		
		if(typeof $(this).attr("readonly") === 'undefined')
			validatePartySize($(".party_size"));
	}).on("keydown", function(e){
		var keyCode = e.keyCode || e.which;
				
		if (keyCode == 9 && partySizeDialog.dialog("isOpen"))
			hidePartySizeWarning();
	});
	
	$(".ui-dialog-titlebar").hide();

	/* $("#partysize-help").click(function(e){
		e.preventDefault();
		e.stopPropagation();
		
		togglePartySizeWarning();
	}); */
	 
	$('html').on("click",function(e) {
        if(partySizeDialog.dialog("isOpen"))
			hidePartySizeWarning();
    });
	
	$(".mod_bottlePackage-item").hover(function(){ $(this).find("img").toggleClass("animated tada"); $(this).find("h5").toggleClass("animated flipInX"); });
	
	if (typeof myVar === 'undefined'){
		party_size = $(".party_size");
	}
});

$(window).resize(function() {
  partySizeDialog.dialog("option","position",{ my: "left top", at: "left bottom", of: party_size });
  partySizeDialog.dialog("option","width",party_size.width());
});