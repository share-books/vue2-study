module.exports = {

     appName: "demo",

   mongoHost: '172.16.42.201',
  
    mongoDatabase:'demo',
    mongoPort: 27017,

   redisHost: '172.16.42.201',
    redisHost: '192.168.1.200',
    redisPort: 6379,

    tokenSecret: 'sisegame',
    tokenExpiresIn: 3600,

    defaultAdminName: 'admin',
    defaultAdminPassword: 'Admin911',

    qiniuAccessKey: '',
    qiniuSecretKey: '',
    qiniuBucketHost: '',
    qiniuBucketName: '',
    qiniuPipeline: ''

}