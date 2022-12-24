const express = require('express')
const router = express.Router()

const expressJoi = require('@escook/express-joi')

const  artcate_handler = require('../router_handler/artcate')
const { add_cate_schema, 
    delete_cate_schema,
    get_cate_schema,
    update_cate_schema } = require('../schema/artcate.js')

// 前缀 /my/cate, eg:/my/cate/list 
router.get('/list', artcate_handler.getArticleCates)

router.post('/add', expressJoi(add_cate_schema),artcate_handler.addArticleCates)

router.get('/delete/:id',expressJoi(delete_cate_schema),artcate_handler.deleteCateById)

router.get('/detail/:id',expressJoi(get_cate_schema),artcate_handler.getArtCateById)

router.post('/update',expressJoi(update_cate_schema),artcate_handler.updateCateById)



module.exports = router