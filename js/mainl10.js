let st;
$(window).on('activate.bs.scrollspy',function(e){
    console.log(e.relatedTarget);
    //取回artticle後面的數字 用parseInt轉成int
    let num = parseInt(e.relatedTarget.slice(8));
    console.log(num);
    $('.article-title').removeClass('article-title-active');
    $(e.relatedTarget+' .article-title').addClass('article-title-active');

    $('.boxs .box').removeClass('active');
    $('.boxs .box'+num).addClass('active');
    switch(num){
        case 5:
            $('.light').show();
            break;
        case 6:
            $('.star1').show();
            $('.star2').show();
			setTimeout(function(){
			$('.ball').show();
			}, 500);
            break;
        default:
            $('.light').hide();
            $('.ball').hide();
            $('.star1').hide();
            $('.star2').hide();
            break;
    }
    clearTimeout(st);
    st=setTimeout(function(){
        $('.bgs .bg').removeClass('active');
        $('.bgs .bg'+num).addClass('active');
    },1000);


});