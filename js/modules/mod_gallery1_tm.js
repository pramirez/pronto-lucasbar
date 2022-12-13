function updateTMGallery(){
	var showp = Number($("#gallery1_tm").attr('show'));
	$.ajax({  
		type: 'GET',
		url: getAJaxURL('/inc/modules/mod_gallery1_tm.cfm?ajax=1&show='+showp),
		processData: false,
		contentType: false,
		dataType: 'html'
	}).done(function(r) {		
		$("#gallery1_tm .container").html(r);
	}).fail(function(xhr, status, error){});
}
$(document).ready(function(){ 
	if($("#gallery1_tm").length){
		setInterval(updateTMGallery, 15000);
	}
});