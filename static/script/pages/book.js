var id = location.href.split('?id=').pop();
$.get('/ajax/book?id='+id,function (bookdata) {
    var windowWidth = $(window).width();
    if (windowWidth < 320){
        windowWidth = 320;
    }
    new Vue({
        el:'#app',
        data:{
            item:bookdata.item,
            related:bookdata.related,
            scren_width:windowWidth,
            double_scrren_width:windowWidth*2
        },
        methods:{
            readBook:function () {
                location.href = '/reader'
            }
        }
    })
},'json');



