const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const multer = require('multer')
const path = require('path')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({
    dest: path.join(__dirname, '../uploads')
})

const article_handle = require('../router_handler/article')
const { add_article_schema, article_id_schema } = require('../schema/article.js')

// 前缀 /my/article, eg:/my/article/add

// 发布新文章的路由
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// upload.single() 接受一个以 fieldname 命名的文件。这个文件的信息保存在 req.file。
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post('/add',upload.single('cover_img'),expressJoi(add_article_schema),article_handle.addArticle)

// 获取文章列表
router.get('/list',article_handle.getArticle)

// 查看文章详情
router.get('/detail/:id',expressJoi(article_id_schema),article_handle.getArticleById)

// 删除文章
router.get('/delete/:id',expressJoi(article_id_schema),article_handle.deleteArticleById)


module.exports = router