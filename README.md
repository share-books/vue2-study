# Blog
A vue2 demo. Based on Vue2, Koa2, MongoDB and Redis


Table of Contents
=================

## 前置

- Node v6
- MongoDB

## server

提供RESTful API的后端

复制conf文件夹中的默认配置`config.tpl`, 并命名为`config.js`

有如下属性可以自行配置:

- `tokenSecret`
  - 改为任意字符串
- `defaultAdminPassword`
  - 默认密码, 必须修改, 否则服务器将拒绝启动

如果mongoDB或redis不在本机对应端口，可以修改对应的属性
- `mongoHost`
- `mongoDatabase`
- `mongoPort`
- `redisHost`
- `redisPort`


```
npm install
npm  satrt 
```

RESTful服务器在本机3000端口开启

有如下两个规定:

- 对所有请求
  - header中必须将`Content-Type`设置为`application/json`, 需要`body`的则`body`必须是合法JSON格式
- 对所有回应
  - header中的`Content-Type`均为`application/json`, 且返回的数据也是JSON格式

## 权限验证

服务器直接允许对`user`模型外的所有模型的GET请求

`user`表的所有请求, 以及其他表的非GET请求, 都必须将header中的`authorization`设置为服务器下发的Token, 服务器验证通过后才会继续执行CRUD操作

### 获得Token
> POST https://ip/proxyPrefix/admin/login

`body`格式如下:

```
{
	"name": "admin",
	"password": "testpassword"
}
```

成功, 则返回带有`token`字段的JSON数据
```
{
  "status": "success",
  "token": "tokenExample"
}
```

失败, 则返回如下格式的JSON数据:
```
{
  "status": "fail",
  "description": "Get token failed. Check name and password"
}
```

获取到`token`后, 在上述需要token验证的请求中, 请将header中的`authorization`设置为服务器下发的Token, 否则请求将被服务器拒绝

### 撤销Token
> POST https://ip/proxyPrefix/admin/logout

将`header`中的`authorization`设置为服务器下发的token, 即可撤销此token

### Token说明
Token默认有效期为获得后的一小时, 超出时间后请重新请求Token  
如需自定义有效期, 请修改服务端配置文件中的`tokenExpiresIn`字段, 其单位为秒

## 查询 

服务器直接允许对`user`模型外的所有模型的GET请求, 不需要验证Token

为了直接通过URI来进行mongoDB查询, 后台提供六种关键字的查询:
```
conditions,
select,
count,
sort,
skip,
limit
```

### conditions查询
类型为JSON, 被解析为对象后, 直接将其作为`mongoose.find`的查询条件

#### select查询
类型为JSON, 用以拾取每条数据所需要的属性名, 以过滤输出来加快响应速度

### count查询
获得查询结果的数量

### sort查询
为了查询方便, sort=1代表按时间倒序, 不使用sort则代表按时间正序

### skip查询和limit查询
#### 查询第2页的文档(每页10条)并按时间倒叙
> GET https://ip/proxyPrefix/api/user?limit=10&skip=10&sort=1


## 新建

需要验证Token

> POST https://ip/proxyPrefix/api/:modelName

Body中为用来新建文档的JSON数据

每个模型的具体字段, 可以查看该模型的[Schema定义](https://github.com/smallpath/blog/blob/master/server/model/mongo.js#L24)来获得

## 替换

需要验证Token

> PUT https://ip/proxyPrefix/api/:modelName/:id

`:id`为查询到的文档的`_id`属性, Body中为用来替换该文档的JSON数据

## 更新

需要验证Token

> PATCH https://ip/proxyPrefix/api/:modelName/:id

`:id`为查询到的文档的`_id`属性, Body中为用来更新该文档的JSON数据

更新操作请使用`PATCH`而不是`PUT`

## 删除

需要验证Token

> DELETE https://ip/proxyPrefix/api/:modelName/:id

删除指定ID的文档
