// 导入mysql模块
const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'my_blog',
})

db.connect();
// 向外共享 db 数据库连接对象
module.exports = db