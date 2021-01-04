$(function() {

	$('.select_view a').click(function() {
		$('.select_view a').removeClass();
		$(this).addClass('active');
		
		$('.switch_content > div').hide();
		$('.' + $(this).attr('href')).show();
		
		return false;
	});

});


$(".arrow_down").click(function() {
    $('html, body').animate({
        scrollTop: $("section.price").offset().top - 30
    }, 1000);
});