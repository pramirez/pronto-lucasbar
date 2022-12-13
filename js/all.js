function getAJaxURL(url){
    if($("html").hasClass("static-site")){
        if($("html").hasClass("isdevsite"))
            url = "https://dev1.bottlesales.club" + url;
        else
            url = "https://www.bottlesales.club" + url;
    }
    return url;
}
function getAllUrlParams(url) {
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  var obj = {};

  if (queryString) {
    queryString = queryString.split('#')[0];
    var arr = queryString.split('&');
	var dfoo = 'foo';

    for (var i = 0; i < arr.length; i++) {
      
	  var a = arr[i].split('=');      
      var paramName = typeof (a[1]) === 'undefined' ? dfoo : a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? a[0] : a[1];
	  
	  if(paramName.indexOf("foo") == 0){
	  	dfoo = 'foo'+i;
	  }

      // paramName = paramName.toLowerCase();
      // if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      if (paramName.match(/\[(\d+)?\]$/)) {
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        if (paramName.match(/\[\d+\]$/)) {
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          obj[key].push(paramValue);
        }
      } else {
        if (!obj[paramName]) {
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}
function initialize_owl(el) {
  $(el).owlCarousel({
		items: 1,
		loop: true,
		smartSpeed : 1000,
		singleItem: true,
		autoplay: false,
		autoplayTimeout: 3000,
		dots: true,
		nav: false,
		center: true,
		margin: 0,
		autoplayHoverPause: true,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn'
	});
}
function destroy_owl(el) {
  $(el).owlCarousel('destroy');
}
(function($){
	"use strict";
	
	$(window).on("load", function(){		
		/* =============== Revolution Slider ===================== */
		var revapi;
		revapi = jQuery('.tp-banner').revolution(
		{
			delay:9000,
			startwidth:1170,
			startheight:967,
			hideThumbs:10,
			fullWidth:"on",
			forceFullWidth:"off"
		});
		
		revapi.on("revolution.slide.onloaded", function(){
			if(!Modernizr.mq('(max-width: 992px)')){
				$("#top-header").addClass("sticky-header");
			}
		});
		
		/* =============== Schedule Tabs Carousel ===================== */
		$('.schedule-tabs .tab-content .nav').owlCarousel({
			items: 3,
			loop: false,
			smartSpeed :1000,
			autoplay:false,
			dots: false,
			nav:true,
			margin: 0,
			responsive : {
				1000:{items:3},
				767:{items:3},
				468:{items:2},
				0:{items:1},
			}
		});
		
		/* =============== Masonary Tabs ===================== */
		/*$(function(){
			mixergallery = $('.mixitup').mixitup({
				effects: ['fade','scale'],
				transitionSpeed: 600,
				layoutMode: 'list',
			});
		});*/
		/*var center = $(".hover").height();
		var centerhalf = center/2;
		$(".hover").css({
			"margin-top":-centerhalf
		})*/
		
		/* =============== Pretty Photo ===================== */
		jQuery("body a[data-rel^='prettyPhoto']").prettyPhoto({
			theme: "facebook"
		});

		var kenburn = $(".kenburns-wrapper").height();
		var kenburnhalf = kenburn/2;
		$(".kenburns-wrapper").css({
			"margin-top":-kenburnhalf
		});

		$('#preloader').fadeOut('slow', function () {
			// $(this).remove();
			if($('#hero3Video').length){
				$('#hero3Video').html('<video class="embed-responsive-item" autoplay muted loop playsinline><source src="'+ $('#hero3Video').attr("vid") +'" type="video/mp4"></video>');
			}
		});
	});

	$(window).on("load resize", function(){
		var fHeight = $(".footer-v1.footer").outerHeight();
		$("body.classic > #content-wrap").css({"margin-bottom":-fHeight+"px","padding-bottom":fHeight+"px"});
		$("body.classic > footer").css({"margin-top":-fHeight+"px"});
		
		$('.nav li.dropdown').unbind("mouseenter mouseleave");
		$('.nav li.dropdown').find('.dropdown-menu').stop(true, true).hide();

		if($(".tp-banner").length){
			if(!Modernizr.mq('(max-width: 992px)')){
				$("#top-header").addClass("sticky-header");
			}else{
				$("#top-header").removeClass("sticky-header");
			}
		}
		if(!Modernizr.mq('(max-width: 991px)')){
			$('.nav li.dropdown').hover(function() {
			  	$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);				
			}, function() {
			  	$(this).find('.dropdown-menu').stop(true, true).fadeOut(100);
			});
		}else{
			$('.nav li.dropdown').find('.dropdown-menu').stop(true, true).show();
			$('.dropdown-toggle').closest('li').addClass('opened');
		}
		$('.dropdown-toggle').click(function(e){
			e.preventDefault();
		});
	});
	
	$(document).ready(function(){		
		/* =============== Services Carousel ===================== */
		$('.full-service-carousel').each(function(){
			var autoplay = $(this).data("autoplay");
			$('.full-service-carousel').owlCarousel({
				items: 1,
				loop: true,
				smartSpeed : 1000,
				singleItem: true,
				autoplay: autoplay,
				autoplayTimeout: 3000,
				dots: true,
				nav: true,
				center: true,
				margin: 0,
				autoplayHoverPause: true,
				animateOut: 'fadeOut',
				animateIn: 'fadeIn'
			});
		});
		
		$('.mod-events2-carousel').owlCarousel({
			items: 3,
			loop: true,
			smartSpeed : 1000,
			singleItem: true,
			autoplay: false,
			autoplayTimeout: 3000,
			dots: false,
			nav: true,
			center: true,
			margin: 10,
			autoplayHoverPause: true,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			responsive : {
				0:{items:1},
				768:{items:2},
				992:{items:3}			
				
			},
			navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"]
		});
		
		let service_tabs = [];
		
		$(".service-tabs li a").each(function(){
			var tab_obj = {};
				tab_obj['target'] = $(this).attr('href');
				tab_obj['owl'] = $(this).attr('owl');
				tab_obj['tab_no'] = $(this).attr('tab-no');
			service_tabs.push(tab_obj);
		});
		
		service_tabs.forEach((tab) => {			
			$('a[href="'+ tab.target +'"]')
				.on('shown.bs.tab', () => initialize_owl($(tab.owl)))
				.on('hide.bs.tab', () => destroy_owl($(tab.owl)));						
			if(Number(tab.tab_no) == 1){
				initialize_owl($(tab.owl));
			}
		});
		
		/* =============== Event Schedula Tabs ===================== */
		var active = $(".schedule-tabs .tab-content .nav li");
		$(".schedule-tabs .tab-content .nav li").click(function(){
			$(active).removeClass("active");
		});
		
		$(".schedule-tabs .tab-content .event h3 a").click(function(e){e.preventDefault();});
		
		$('.magnific-video').magnificPopup({
		  	type: 'iframe'
		});
		
		$('.magnific-gallery.html').magnificPopup({
		  	type: 'image',
			gallery:{
				enabled: true
			}
		});
		
		$(function() {
			$('.content-split').matchHeight();
		});
		
		$(".map-click").click(function(){
			if(tjMemberID.length && tjMapID.length){
				var img = $('<img />').attr({
					'id': tjMapID + '_cpa_testing',
					'src': 'https://ads.trafficjunky.net/tj_ads_pt?a='+tjMapID+'&member_id='+tjMemberID+'&cb='+Math.floor(Math.random() * 2000000)+'&cti=0&ctv=0&ctd=directions',
					'width': 1,
					'height': 1,
					'border': 0
				}).prependTo('footer');
			}
		});
	});
	
	/* --------------------------------------------
     Platform detect
     --------------------------------------------- */
    var mobileTest;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        mobileTest = true;
        $("html").addClass("mobile");
    }
    else {
        mobileTest = false;
        $("html").addClass("no-mobile");
    }
    
	if (/iPhone|iPad|iPod/i.test(navigator.userAgent)){
        $("html").addClass("ios");
    }
	
    var mozillaTest;
    if (/mozilla/.test(navigator.userAgent)) {
        mozillaTest = true;
    }
    else {
        mozillaTest = false;
    }
    var safariTest;
    if (/safari/.test(navigator.userAgent)) {
        safariTest = true;
    }
    else {
        safariTest = false;
    }
})(jQuery);
