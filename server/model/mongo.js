let config = require('../conf/config');
let mongoose = require('mongoose');
let log = require('../utils/log');
let tokenService = require('../service/token');
//let passportLocalMongoose = require('passport-local-mongoose');

mongoose.Promise = require('bluebird');

let mongoUrl = `${config.mongoHost}:${config.mongoPort}/${config.mongoDatabase}`;

mongoose.connect(mongoUrl);

let db = mongoose.connection;

db.on('error', (err)=>{
    log.error("connect error:", err);
});

db.once('open', () => {
    log.debug('MongoDB is ready')
});

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let showpiece = new Schema({//展示品
    title: String,//标题
    categoryCode: String,//归类代码，比如A-1-2
    tags: Array,//标签集合
    images: Array,//相关图片文件名
    rarFile: String,//打包文件
    allowComment: { type: Boolean, default: true },//是否允许评论
    createdAt: { type: String, default: '' },//创建日期
    updatedAt: { type: String, default: '' },//修改日期
    isPublic: { type: Boolean, default: true },//是否公开
    commentNum: Number,//评论数量
    loveNum: Number//好评数量

});

let category = new Schema({
    code: String,//比如A-1
    name: String//游戏-原画
    
});

let tag = new Schema({
    name: String,//比如中国水墨是黑色，油画是红色
    color: String
});



let user = new Schema({
    name: String,//学号或老师工号
    displayName: String,
    password: String,
    email: String,
    type:String// S-超级管理员 A--展品管理员 C--普通用户
});
/*
user.plugin(passportLocalMongoose,{ 
 	usernameField :'name', 
 	hashField:'password', 
 	saltlen:8, 
 	keylen:32 
 }); */

 

 
 user.pre('save', function (next) { 
     if(this.password&&this.password.length <10){  
         this.password=tokenService.createHash(this.password)
 		/*  this.setPassword(this.password,function(err,user){ 
 			  console.log("setPasswod:",user.password); 
 			  if(err) console.log("setPasswod ERROR"); 
 			  else 
 			    next(); 
 		  });*/ 
 	}
    next(); 
 		 
 }); 

showpiece = mongoose.model('showpiece', showpiece),
category = mongoose.model('category', category),
tag = mongoose.model('tag', tag),
user = mongoose.model('user', user);

module.exports = {
    showpiece,
    category,
    tag,
    user
}