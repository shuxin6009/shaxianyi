$(document).ready(function(){
	//成分类型
	$('.puallsix ul li').click(function(){
		//$(this).addClass('cur').siblings('li').removeClass('cur');
        $(this).toggleClass('cur');
	});

	$('.puallsixmx ul li').click(function(){
		$(this).toggleClass('cur');
	});

	$('.fabunav ul li').click(function(){
		var ks=$(this).index();
		$('.fabunav ul li').eq(ks).addClass('cur').siblings('li').removeClass('cur');
	});

	$('.xialajia').click(function(){
		$(this).find('.xialsix').toggleClass('cur');
	});
   //全选
	$('.xuansix').click(function(){
		//$(this).toggleClass('cur');
        $('.xuansix').toggleClass('cur');
		$('.lielast').toggleClass('cur');
	});

	$('.lielast').click(function(){
		$(this).toggleClass('cur');
	});

	$('.leftyema a.smal').click(function(){
		$(this).addClass('cur').siblings('a').removeClass('cur');
	});

	$('.inmaslt ul li').click(function(){
		var ms=$(this).index();
		var sp=$('.qiebox').index();
		sp=ms;
		$('.inmaslt ul li').eq(ms).addClass('cur').siblings('li').removeClass('cur');
		$('.qiebox').eq(ms).addClass('cur').siblings('.qiebox').removeClass('cur');
	});


	$('.tanspan3').click(function(){
		$('.chuanpoll').show();
	});

	$('.hidesp').click(function(){
		$('.chuanpoll').hide();
	});

	$('.tanspan4').click(function(){
		$('.chuanstvt').show();
	});

	$('.hidesp2').click(function(){
		$('.chuanstvt').hide();
	});

});