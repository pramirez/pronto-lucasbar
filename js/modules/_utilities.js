$.validator.addMethod("over18", function(value, element, arg){	
	if(value == undefined)
		return false;
	else
	{
		$("#over18").css("color", "inherit");		
		return true;
	}
}, "You must be over 21");

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    return this;
}

function Trim(str)
{
	str = str.replace(/^\s+/, '');
	for (var i = str.length - 1; i >= 0; i--) {
		if (/\S/.test(str.charAt(i))) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return str;
}

function echeck(str) 
{	
	str = Trim(str);
	
	var at="@"
	var dot="."
	var lat=str.indexOf(at)
	var lstr=str.length
	var ldot=str.indexOf(dot)
	
	if (str.indexOf(at)==-1)
	{
	   return false
	}

	if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr)
	{
	   return false
	}

	if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr)
	{
		return false
	}

	 if (str.indexOf(at,(lat+1))!=-1)
	 {
		return false
	 }

	 if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot)
	 {
		return false
	 }

	 if (str.indexOf(dot,(lat+2))==-1)
	 {
		return false
	 }
	
	 if (str.indexOf(" ")!=-1)
	 {
		return false
	 }

	 return true					
}

isValidCreditCardNumber = function(cardNumber)
{
  var isValid = false;
  var ccCheckRegExp = /[^\d ]/;
  isValid = !ccCheckRegExp.test(cardNumber);

  if (isValid)
  {
    var cardNumbersOnly = cardNumber.replace(/ /g,"");
    var cardNumberLength = cardNumbersOnly.length;
    var lengthIsValid = false;
    var prefixIsValid = false;
    var prefixRegExp;	
		
	// Visa: length 16, prefix 4, dashes optional.
      var visa = /^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/;
		
	// Mastercard: length 16, prefix 51-55, dashes optional.
      var mastercard = /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/;
	
	// Discover: length 16, prefix 6011, dashes optional.
      var discover = /^6011-?\d{4}-?\d{4}-?\d{4}$/;
	
	// American Express: length 15, prefix 34 or 37.
      var amex = /^3[4,7]\d{13}$/;
	  
	// Diners: length 14, prefix 30, 36, or 38.
      var dinersclub = /^3[0,6,8]\d{12}$/;
	  
	if(visa.test(cardNumbersOnly) || mastercard.test(cardNumbersOnly) || discover.test(cardNumbersOnly) || amex.test(cardNumbersOnly) || dinersclub.test(cardNumbersOnly))
	{
		isValid = true;
	}
	else
	{        
        var data = new FormData();
            data.append('ccNumber', cardNumbersOnly);

        $.ajax({  
            type: 'POST',
            url: getAJaxURL('/inc/modules/_utilities.cfm'),
            data: data,
            async: false,
            processData: false,
            contentType: false
        }).done(function(r) {            
            isValid = (r === 'true');            
        }).fail(function(){
            alert('Whoops! This didn\'t work. Please contact.html us.')
        });        
        return isValid;
	}
  }

  if (isValid)
  {
    var numberProduct;
    var numberProductDigitIndex;
    var checkSumTotal = 0;

    for (digitCounter = cardNumberLength - 1; 
      digitCounter >= 0; 
      digitCounter--)
    {
      checkSumTotal += parseInt (cardNumbersOnly.charAt(digitCounter));
      digitCounter--;
      numberProduct = String((cardNumbersOnly.charAt(digitCounter) * 2));
      for (var productDigitCounter = 0;
        productDigitCounter < numberProduct.length; 
        productDigitCounter++)
      {
        checkSumTotal += 
          parseInt(numberProduct.charAt(productDigitCounter));
      }
    }

    isValid = (checkSumTotal % 10 == 0);
  }

  return isValid;
}

function padtime(number, length){   
    var number = (number==24)?0:number,
        length = typeof length !== 'undefined' ? length : 2,
        str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }   
    return str;
}

function h24to12(h,m,am){
    var str = '',
        am = typeof am !== 'undefined' ? 'on '+am : '';
    
    if(h>0 && h<12)
        str = h+':'+padtime(m)+' AM';
    else if(h==12)
        str = '12:'+padtime(m)+' PM'+((m==0)?' (noon)':'');
    else if(h==0 || h==24)
        str = '12:'+padtime(m)+' AM'+((m==0)?' (midnight ' + am + ')':'');
    else
        str = (h-12)+':'+padtime(m)+' PM';
    
    return str;
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
