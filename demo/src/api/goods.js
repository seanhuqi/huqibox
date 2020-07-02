// 商品相关

// cerated by huqi 2020/5/19

// 引入工具函数
import req from '../utils/request.js'



// 获取分类列表
export const getCateNameList = (params) => req.get('/goods/catelist', params)

// 编辑分类
export const editCate = (params) => req.post('/goods/editcate', params)

// 删除分类
export const delCate = (params) => req.get('/goods/delcate', params)

// 添加分类
export const addCate = (params) => req.post('/goods/addcate', params)

// 获取商品列表
export const goodsList = (params) => req.get('/goods/list', params)

// 获取所有商品分类
export const GetCateGories = () => req.get('/goods/categories')

// 添加商品
export const addGoods = (params) => req.post('/goods/add', params)

// 删除商品
export const delGoods = (params) => req.get('/goods/del', params)

// 编辑商品
export const editGoods = (params) => req.post('/goods/edit', params)