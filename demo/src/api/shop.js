/**
 * 店铺相关请求
 */

import req from "../utils/request.js"; // 引入封装好的工具函数


// 获取店铺信息
export const getShopInfo = () => req.get('/shop/info')

// 修改店铺信息
export const editShopInfo = (params) => req.post('/shop/edit', params)