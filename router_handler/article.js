const db = require('../db/index')
const path = require('path')

exports.addArticle = (req,res) => {

    // 手动判断是否上传了文章封面
    if(!req.file || !req.file.fieldname  !== 'cover_img') return res.cc('文章封面是必选参数！')
    const articleInfo = {
        // 标题、内容、状态、所属的分类Id
        ...req.body,
        // 文章封面在服务器端的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 文章发布时间
        pub_date: new Date(),
        // 文章作者的Id
        author_id: req.user.id,
    }
    const sql = `insert into ev_articles set ?`
    db.query(sql,articleInfo,(err,result) => {
        if(err) return res.cc(err)
        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('发布文章失败！')

        // 发布文章成功
        res.cc('发布文章成功', 0)
    })
}

exports.getArticle = (req,res) => {
    const sql = `select * from ev_articles where is_delete=0 order by id desc`
    db.query(sql,(err,result) => {
        if(err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章列表成功！',
            data: result
        })
    })
}

exports.getArticleById = (req,res) => {
    const sql = `select * from ev_articles where id=?`
    db.query(sql,req.params.id,(err,result) => {
        if(err) return res.cc(err)
        if(result.length !== 1) return res.cc('获取文章详情失败！')
        res.send({
            status: 0,
            message: '获取文章详情成功！',
            data: result[0]
        })
    })
}

exports.deleteArticleById = (req,res) => {
    const sql = `update ev_articles set is_delete=1 where id=?`
    db.query(sql,req.params.id,(err,result) => {
        if(err) return res.cc(err)
        if(result.affectedRows !== 1) return res.cc('删除文章失败！')
        res.cc('删除文章成功！', 0)
    })
}

