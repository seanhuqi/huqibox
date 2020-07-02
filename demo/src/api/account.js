// 账号相关

// cerated by huqi 2020/5/19

// 引入工具函数
import req from '../utils/request.js'


// 登录
export const checkLogin = (params) => req.post('/users/checkLogin', params)

// 添加账号
export const addUser = (params) => req.post('/users/add', params)

// 获取账号列表
export const getAccList = (params) => req.get('/users/list', params)

// 删除账号
export const delAcc = (params) => req.get('/users/del', params)

// 批量删除账号
export const batchDelAcc = (params) => req.get('/users/batchdel', params)

// 编辑
export const editAcc = (params) => req.post('/users/edit', params)

// 检查旧密码
export const checkOld = (params) => req.get('/users/checkoldpwd', params)

// 密码修改
export const editPwd = (params) => req.post('/users/editpwd', params)

// 获取账户个人中心
export const getAccInfo = () => req.get('/users/info')

// 头像修改接口
export const updateAvatar = (params) => req.get('/users/avataredit', params)

// 获取用户身份
export const getRole = () => req.get('/users/role')