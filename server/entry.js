require('babel-register')({
  plugins: ['transform-async-to-generator']
});

require('./app.js');

//{"name":"admin","password":"Admin911"}

//authorization