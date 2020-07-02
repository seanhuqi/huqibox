// 商品相关

// cerated by huqi 2020/5/23

// 引入工具函数
import req from '../utils/request.js'


// 获取订单列表
export const getOrderList = (params) => req.get('/order/list', params)

// 查询
export const Search = (params) => req.get('/order/search', params)

// 获取订单详情
export const getDetail = (params) => req.get('/order/detail', params)

// 修改订单
export const editOrder = (params) => req.post('/order/edit', params)