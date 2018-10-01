const Koa = require('koa');

const server = new Koa();

server
    .use(context => {
        context.body = 'this is context'
    })
    .listen(8000);