const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

/**
1.检测表单数据是否合法
2.检测用户名是否被占用
3.对密码进行加密处理
4.插入新用户
 */
exports.regUser = (req,res) => {
    // 1. 检测表单数据是否合法
    const userInfo = req.body
    if(!userInfo.username || !userInfo.password){
        // return res.send({
        //     status: 1,
        //     message: '用户名或密码不能为空！'
        // })
        // 使用全局中间件处理响应错误的方法
        return res.cc('用户名或密码不能为空！')
    }
    // 2. 检测用户名是否被占用
    const sql = `select count(1) from ev_users where username=?`
    db.query(sql,userInfo.username,function (err,result) {
        // 执行sql失败
        if(err) {
            return res.cc(err)
        }
        // 用户名被占用]
        if(result > 1) {
            return res.cc('用户名被占用，请更换其他用户名！')
        }
        // 3. 对密码进行加密处理
        // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
        userInfo.password = bcrypt.hashSync(userInfo.password,10)
        // 4. 插入新用户
        const insertSql = `insert into ev_users set ?`
        db.query(insertSql,{
            username: userInfo.username, 
            password: userInfo.password
        },function (err,result) {
            if(err) {
                return res.cc(err)
            }
            if(result.affectedRows !==1) {
                return res.cc('注册用户失败，请稍后再试！')
            }
            // 注册成功
            res.send({
                status: 0,
                message: '注册成功！'
            })
        })
        
    })
}

/**
1.检测表单数据是否合法
2.根据用户名查询用户的数据
3.判断用户输入的密码是否正确
4.生成 JWT 的 Token 字符串
 */
exports.login = (req,res) => {
    const userinfo = req.body
    const sql = `select * from ev_users where username=?`
    db.query(sql,userinfo.username,function (err,result) {
        if(err) {
            return res.cc(err)
        }
        if(result.length !== 1) {
            return res.cc('登录失败！')
        }
        // 调用 bcrypt.compareSync(用户提交的密码, 数据库中的密码) 方法比较密码是否一致
        // 返回值是布尔值（true 一致、false 不一致）
        const compareResult = bcrypt.compareSync(userinfo.password,result[0].password)
        if(!compareResult) {
            return res.cc('密码错误！')
        }
        // 在生成 Token 字符串的时候，一定要剔除 密码 和 头像 的值
        const user = {...result[0],password: '',user_pic: ''}
        // 生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h', // token 有效期为 10 个小时
        })
        // 将token响应给用户
        res.send({
            status: 0,
            message: '登录成功！',
            token: 'Bearer ' + tokenStr
        })
        
    })
}