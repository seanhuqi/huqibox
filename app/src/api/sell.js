import req from '../utils/request.js'

// 获取商品数据
export const getGoodList = () => req.get('/goods/goods_list')

// 获取评价数据
export const getRatings = () => req.get('/shop/ratings')

// 获取店铺数据
export const getSeller = () => req.get('/shop/seller')