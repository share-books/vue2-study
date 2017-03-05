const log = require('./utils/log');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaRouter = require('koa-router');

const koa2RestMongoose = require('./mongo_rest/index');
const tokenService = require('./service/token');
const models = require('./model/mongo');
const redis = require('./model/redis');
const config = require('./conf/config');
const option = require('./conf/option');
const getQiniuTokenFromFileName = require('./service/qiniu')
const { login, logout, permission } = require('./routes/admin');
const restc = require('restc');
const bluebird = require("bluebird");
//const path = require('path')
//const fs = require('fs')
//const resolve = file => path.resolve(__dirname, file)
global.Promise = bluebird;

const app = new Koa();
app.use(bodyParser());

const router = koaRouter();

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  log.info(`${ctx.method} ${decodeURIComponent(ctx.url)} - ${ms}ms`);
});

app.use(restc.koa2());

router.post('/admin/qiniu', permission, (ctx, next) => {
  const { key } = ctx.request.body
  ctx.body = getQiniuTokenFromFileName(key)
})
router.post('/admin/login', login);
router.post('/admin/logout', logout);


Object.keys(models).forEach(value => {
  koa2RestMongoose(app, router, models[value], '/api', permission);
});



(async ()=>{

  let count = await models.user.find().count().exec();
  if (count == 0){

    if (config.defaultAdminPassword === 'admin'){
      log.error('you must change the default passoword at ./conf/config.js');
      log.error('koa2 refused to start because of weak password');
      return process.exit(1);
    }

    let result = await models.user.create({
      name: config.defaultAdminName,
      password: config.defaultAdminPassword,
      displayName: config.defaultAdminName,
      type:'S',
      email: ''
    });

    log.info(`account '${result.name}' is created`);

  }

  app.listen(3000);

  log.debug(`koa2 is running at 3000`);

})();
