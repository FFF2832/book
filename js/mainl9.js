
$(window).on('activate.bs.scrollspy',function(e){
    console.log(e.relatedTarget);
    $('.article-title').removeClass('article-title-active');
    $(e.relatedTarget+' .article-title').addClass('article-title-active');
});