// 报表相关

// cerated by huqi 2020/5/23

// 引入工具函数
import req from '../utils/request.js'

// 获取首页列表
export const getTotalData = () => req.get('/order/totaldata')

// // 获取订单列表
export const getOrderTotal = (params) => req.get('/order/ordertotal', params)