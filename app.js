const express = require('express')
const cors = require('cors')
const joi = require('joi')
const expressJWT = require('express-jwt')
const multer = require('multer')
const config = require('./config')

const userRouter = require('./router/user.js')
const userinfoRouter = require('./router/userinfo.js')
const artcateRouter = require('./router/artcate.js')
const articleRouter = require('./router/article.js')

// 创建express服务器
const app = express()

// 配置 cors 跨域中间件
app.use(cors())

// 通过 express.json() 这个中间件，解析表单中的 JSON 格式的数据
app.use(express.json())
// 配置解析表单数据的中间件 application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}))

// 在路由之前，声明一个全局中间件，为res挂在一个res.cc()函数
// 响应数据的中间件
app.use(function (req,res,next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function (err,status = 1) {
        res.send({
            status,
            // 状态描述，判断 err 是 错误对象 还是 字符串
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 解析token中间件
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT( {secret: config.jwtSecretKey}).unless({path: [/^\/api\//]}))

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))
// 注册导入路由
app.use('/api',userRouter)
// 以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my',userinfoRouter)
app.use('/my/cate',artcateRouter)
app.use('/my/article',articleRouter)

// 错误中间件
app.use(function (err,req,res,next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    // 上传文件失败错误
    if(err instanceof multer.MulterError) return res.cc('上传文件失败！')
    // 未知错误
    res.cc(err)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80,function () {
    console.log('api server running at http://127.0.0.1:80')
})