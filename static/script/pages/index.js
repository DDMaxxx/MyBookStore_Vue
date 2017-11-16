/**
 * Created by Administrator on 2017/8/19.
 */
$.get('/ajax/index',function (d) {
    var windowWidth = $(window).width();
    if (windowWidth < 320){
        windowWidth = 320;
    }
    var offset = $($('.Swipe-tab').find('a')[0]).offset();
    var index_header_tab_width = offset.width;
    new Vue({
        el:'#app',
        data:{
            scren_width:windowWidth,
            double_scrren_width:windowWidth*2,
            index_header_tab_width: index_header_tab_width,
            top:d.items[0].data.data,
            hot:d.items[1].data.data,
            recommend:d.items[2].data.data,
            female:d.items[3].data.data,
            male:d.items[4].data.data,
            free:d.items[5].data.data,
            topic:d.items[6].data.data,
            tab_1_class:'Swipe-tab_on',
            tab_2_class:''
        },
        methods:{
            tabSwitch:function (pos) {
                if( 0 == pos){
                    $('.Swipe-tab i').css('transform','translate3d(0,0,0)');
                    $('#scroll-warp').css('transform','translate3d(0,0,0)');
                    this.tab_1_class = 'Swipe-tab_on';
                    this.tab_2_class = "";
                }else{
                    $('.Swipe-tab i').css('transform','translate3d('+this.index_header_tab_width+'px,0,0)');
                    $('#scroll-warp').css('transform','translate3d(-'+this.scren_width+'px,0,0)');
                    this.tab_2_class = 'Swipe-tab_on';
                    this.tab_1_class = "";
                }
            },
            chapterInfo:function (id) {
                id = 18218
                location.href = '/book?id='+id;
            }
        }
    })
},'json')
