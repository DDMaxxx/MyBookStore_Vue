var koa = require('koa');
var controller = require('koa-route');
var app = koa();

var views = require('co-views');
var render = views('./view',{
    map:{ html : 'ejs'}
});
var koa_static = require('koa-static-server')
var service = require('./service/webAppService')
var qs = require('querystring')

app.use(koa_static({
    rootDir:'./static/',
    rootPath:'/static/',
    maxage: 0
}))

app.use(controller.get('/route_test',function*() {
    this.set('Cache-Control','no-cache');
    this.body = 'hello world!'
}))

app.use(controller.get('/ejs_test',function*() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('test',{title : 'title_test'});
}))

app.use(controller.get('/',function*() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('index',{title : '我的书城测试'});
}))

app.use(controller.get('/search',function*() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('search');
}))

app.use(controller.get('/reader',function*() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('reader');
}))

app.use(controller.get('/male',function*() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('male',{nav:'男生频道'});
}))

app.use(controller.get('/female',function*() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('female',{nav:'女生频道'});
}))

app.use(controller.get('/rank',function*() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('rank',{nav:'排行'});
}))
app.use(controller.get('/category',function*() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('category',{nav:'分类'});
}))


app.use(controller.get('/book',function*() {
    this.set('Cache-Control','no-cache');
    var params = qs.parse(this.req._parsedUrl.query);// 转换取出请求参数
    var bookId = params.id;
    this.body = yield render('book',{bookId : bookId,nav:'书籍详情'});
}))

app.use(controller.get('/api_test',function*() {
    this.set('Cache-Control','no-cache');
    this.body = service.get_test_data();
}))

app.use(controller.get('/ajax/female',function*() {
    this.set('Cache-Control','no-cache');
    this.body = service.get_female_data();
}))

app.use(controller.get('/ajax/male',function*() {
    this.set('Cache-Control','no-cache');
    this.body = service.get_male_data();
}))

app.use(controller.get('/ajax/category',function*() {
    this.set('Cache-Control','no-cache');
    this.body = service.get_category_data();
}))

app.use(controller.get('/ajax/rank',function*() {
    this.set('Cache-Control','no-cache');
    this.body = service.get_rank_data();
}))

// 搜索的路由
app.use(controller.get('/ajax/search',function*() {
    this.set('Cache-Control','no-cache');
    var params = qs.parse(this.req._parsedUrl.query);// 转换取出请求参数
    var start = params.start;
    var end = params.end;
    var keyword = params.keyword;
    this.body = yield service.get_search_data(start,end,keyword);
}))

// 章节的路由
app.use(controller.get('/ajax/chapter',function*() {
    this.set('Cache-Control','no-cache');
    this.body = service.get_chapter_data();
}))

// 获取书记信息的路由
app.use(controller.get('/ajax/book',function*() {
    this.set('Cache-Control','no-cache');
    var params = qs.parse(this.req._parsedUrl.query);// 转换取出请求参数
    var bookid = params.id;
    if (!bookid){
        bookid = ''
    }
    this.body =  service.get_book_data(bookid);
}))

// 获取章节内容的路由
app.use(controller.get('/ajax/chapter_data',function*() {
    this.set('Cache-Control','no-cache');
    var params = qs.parse(this.req._parsedUrl.query);// 转换取出请求参数
    var bookid = params.id;
    if (!bookid){
        bookid = ''
    }
    this.body =  service.get_chapter_content_data(bookid);
}))

app.use(controller.get('/ajax/index',function*() {
    this.set('Cache-Control','no-cache');
    this.body =  service.get_index_data();
}))

app.listen(3001);
console.log('Koa server is started!')