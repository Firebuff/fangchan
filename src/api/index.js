import { get, post } from './methods'

//新房列表
export const getHouseList = (params) => {
    // console.log(params)
    return get('webapp/houseslist', params)
}
//筛选数据
export const getFilter = (tag) => {
    return get('webapp/filter',{tag:tag})
}
//新房详情
export const getHouseDetail = (params) => {
    // console.log(params)
    return get('webapp/housesdetail', params)
}

//首页数据
export const getIndex = (params) => {
    // console.log(params)
    return get('webapp/index', params)
}

//资讯详情
export const getNewsDetail = (params) => {
    // console.log(params)
    return get('webapp/newsdetail', params)
}

// 手机验证码
export const getMessageCode = (params) => {
    // console.log(params)
    return post('admin/sms/smstpl', params)
}

// 获取手机验证码类型
export const getMessageType = (params) => {
    // console.log(params)
    return get('webapp/teltpl', params)
}

// 手机登录
export const loginByPhone = (params) => {
    // console.log(params)
    return post('admin/webapp/logina', params)
}

//获取用户信息
export const getUserInfo = (params) => {
    // console.log(params)
    return get('webapp/userinfo', params)
}

//获取表单token值
export const getToken = () => {
    return get('webapp/token')
}

//账号密码登录
export const loginByCount = (params) => {
    return post('admin/webapp/logina', params)
}
