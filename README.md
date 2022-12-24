# 前言
本项目是基于nodejs搭建的个人博客后台服务

# 目录结构
```
│  app.js                              // 入口文件
│  package.json                       // npm包管理所需模块及配置信息
├─db
│      index.js                      // mysql数据库基础配置
├─router                             // 路由模块
│      user.js                          // 用户登录注册路由模块
│      userinfo.js                      // 用户信息路由模块
│      artcate.js                       // 文章分类管理路由模块
│      article.js                       // 文章管理路由模块
├─router_handler                     // 路由处理函数模块
│      user.js                          // 用户登录注册路由处理函数模块
│      userinfo.js                      // 用户信息路由处理函数模块
│      artcate.js                       // 文章分类管理路由处理函数模块
│      article.js                       // 文章管理路由处理函数模块
├─schema                            // 验证规则模块
│      user.js                          
│      artcate.js                       
│      article.js                       
└─config.js                         // 加密 和 还原 Token 的 jwtSecretKey 字符串
       
```


# 技术栈
 * NodeJS
 * express
 * mysql
 * nodemon
 * cors  
 * joi
 * escook/express-joi
 * express-jwt
 * jsonwebtoken
 * bcryptjs
 * multer
 
# 功能模块
* 登录
* 注册
* 个人中心（查询用户基本信息、更新用户基本信息、重置密码、更新用户头像）
* 文章分类管理（查询分类列表、查询分类详情、新增分类、删除分类、更新分类）
* 文章管理（查询文章列表、查询文章详情、新增文章、删除文章）

# 下载安装依赖
```
git clone https://github.com/YienfongChueng/my-blog.git
cd big-event-server
npm install 或 yarn
```

## MySQL安装

## 数据库表
* ev_users

字段 |描述
---|---
id | 
username | 用户名称 
password | 用户密码
nickname | 昵称
email | 邮箱
user_pic | 用户头像

* ev_article_cate

字段 |描述
---|---
id | 
name | 分类名称 
alias | 分类别名
is_delete | 是否删除（0没删除，1删除）

* ev_articles

字段 |描述
---|---
id | 
title | 标题
content | 文章内容
cover_img | 封面
pub_date | 发布时间
state | 状态（已发布、草稿）
is_delete | 是否删除（0没删除，1删除）
cate_id | 分类id
author_id | 作者id



## 开发模式
```
npm run start
```
运行之后，访问地址：http://127.0.0.1:80



