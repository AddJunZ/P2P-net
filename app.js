const Koa = require('koa');
const server = new Koa();
const Router = require('koa-router');
const router = new Router();
const IO = require('koa-socket');//实现对websocket的对接的
const io = new IO();
const render = require('koa-ejs');//模板
const path = require('path');//为了写模板的路径引入的
const body = require('koa-better-body');

server.use(body({
    uploadDir:'./static/upload'
}))

//这样一挂后，路由里都能使用了？
render(server,{
    root:path.join(__dirname,'views'),
    layout:false,
    viewExt:'html',
    cache:false,
    debug:false
})



router.use('', require('./routes/index.js'))
server.use(router.routes())




//socket
io.attach(server);
//附着之后可以使用server.io来访问socket
//如果没有的话，则浏览器向服务器方向的连接就不成立




io.use(async (ctx, next) => {
    let start = new Date()
    await next()
    console.log(`response time: ${new Date() - start}ms`)
})





//在这里监听html触发的事件
//登录后就跳到聊天界面
server.io.on('login',ctx=>{
    // console.log('login');
    // 路由的ctx才有跳转
    // ctx.redirect('/chat');
    // io.b
})



//attach后都不能再用这种方式了吗
// io.on('join', (ctx, data) => {
//     console.log('join event fired', data);
// })


server.listen(8080, () => {
    console.log('监听8080');
})