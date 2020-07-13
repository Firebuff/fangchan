// 引用http
import {
    get,
    post
} from '../util/http'

import { isObject, inArray } from '../util/mUtils'
import { getDeviceName } from '../util/nativeApi'


/**
 * 获取详情数据
 * 
 * 参数说明
 * @param  {Boolean} showLoading 开始加载数据
 * @param  {Boolean} error 是否请求出错
 * @param  {Object} detail 当前数据 
 * @param  {Boolean} dataNoExist 数据不存在
 * 
 */
const detailData = (url, vueExample) => {
    // 初次请求初始化loading
    vueExample.showLoading = true
    // 请求初始化error
    vueExample.error = false

    vueExample.detail = {}

    // 自动获取url上所有参数进行数据请求
    let params = {}
    for (let key in vueExample.$route.query) {
        params[key] = vueExample.$route.query[key]
    }
    return get(url, params).then((data) => {
        // 数据请求成功并且数据存在的时候执行
        if (data.status) {
            // 数据赋值
            vueExample.detail = data
        } else {
            // 数据不存在
            vueExample.dataNoExist = true
        };
        // 关闭加载框
        vueExample.showLoading = false
    }).catch((error) => {
        // 数据请求错误时执行
        // 关闭加载框
        vueExample.showLoading = false
        // 显示重新加载按钮
        vueExample.error = true
        // 显示错误原因
        console.log(error)
    })
}

/**
 * 获取列表数据
 * 
 * 参数说明
 * @param  {Object} filterParams 筛选条件
 * @param  {Object} filterDefaultParams 默认筛选条件（即不管怎么重置都不会被清空的参数）
 * @param  {Boolean} finished 是否全部数据加载结束
 * @param  {Object} listError 数据请求错误
 * @param  {Object} listNo 没有数据提示
 * @param  {Array} list 列表数据
 * @param  {Boolean} showLoading 加载图标
 * @param  {Number} pageIndex 加载页数
 * @return {} 
 */
const listData = (url, vueExample) => {

    let filterParams = {}
    // 去除空值的对象
    for (let key in vueExample.filterParams) {
        if (vueExample.filterParams[key] || vueExample.filterParams[key] === 0) {
            filterParams[key] = vueExample.filterParams[key]
        }
    }
    // 结束加载
    if (vueExample.finished) {
        vueExample.finished = false
    }
    // 错误请求提示
    vueExample.listError = null
    // 没有数据提示
    vueExample.listNo = null
    // 如果是使用分页切换的话则需要手动启用加载
    if (vueExample.pageParams) {
        // 请求开始
        vueExample.showLoading = true
    }
    // 返回请求
    // filterDefaultParams 默认参数配置，如详情内页中的列表必须带有aid
    
    
    return get(url, {
        ...filterParams,
        ...vueExample.filterDefaultParams,
        pageIndex: vueExample.pageIndex
    }).then((data) => {
        if (data.status) {
            // 列表中嵌入数据显示处理
            let return_data = []
            if (data.pushs) {
                for (let i = 0, len = data.data.length; i < len; i++) {
                    if (i == 7 || (data.pageIndex == data.pageAllIndex && len < 7 && i == len - 1) ) {
                        return_data.push(data.data[i])
                        data.pushs.length && return_data.push(data.pushs)
                    } else {
                        return_data.push(data.data[i])
                    }
                }
            } else {
                return_data = data.data
            }
            // 返回分页配置
            if (vueExample.pageParams) {
                vueExample.pageParams = {
                    pageIndex: data.pageIndex,
                    pageCount: data.pageCount,
                    pageSize: data.pageSize
                }
                vueExample.list = return_data
            } else {
                // 列表数据
                vueExample.list = [...vueExample.list, ...return_data]
                // 页数+1
                vueExample.pageIndex += 1
            }
            // 清空没有数据提示
            vueExample.listNo = null
            // 返回其他数据附属
            for (const key in data) {
                if (!inArray(['pushs', 'pageSize', 'pageIndex', 'data', 'pageCount', 'listGrid', 'listDesc', 'pageAllIndex', 'status'], key)) {
                    vueExample[key] = data[key]
                }
            }
        } else {
            vueExample.listNo = data
        }
        vueExample.showLoading = false
        // 结束请求
        if (data.pageIndex >= data.pageAllIndex || data.status === 0) {
            vueExample.finished = true
            // 数据加载完成执行
            if (!vueExample.listNo) {
                vueExample.listNo = { status: 0, name: '暂无更多数据，上拉查看其他数据' }
            }
        }
    }).catch((error) => {
        // 结束加载
        // vueExample.showLoading = false
        // // 接收请求
        // vueExample.finished = true
        vueExample.listError = { status: 0, name: '加载失败，点击重新加载' }
    })
}

/**
 * 获取搜索热门关键词
 */
export const getHotWord = () => {
    return get('webapp/keyword')
}

/**
 * 获取倒计时广告
 */
export const getCountDownAd = () => {
    return get('webapp/countdownad')
}

/**
 * 分站
 */
export const getCity = () => {
    return get('webapp/area')
}

/**
 * 获取当前分站
 */
export const getCurrentCity = () => {
    return get('webapp/city')
}

/**
 * 获取首页数据
 */
export const getIndex = () => {
    return get('webapp/index')
}


/**
 * 获取新房列表数据
 */
export const getHousesList = (vueExample) => {
    if (isObject(vueExample)) {
        return listData('webapp/houseslist', vueExample)
    } else {
        return get('webapp/houseslist', {
            name: vueExample
        })
    }
}

/**
 * 获取新房详情数据
 */
export const getHousesDetail = (vueExample) => {
    return detailData('webapp/housesdetail', vueExample)
}

/**
 * 获取沙盘数据
 */
export const getShapan = (aid) => {
    return get('webapp/shapan', {
        aid: aid
    })
}

/**
 * 获取新房资讯数据
 */
export const getHousesNews = (vueExample) => {
    return listData('webapp/housesnews', vueExample)
}

/**
 * 获取新房资讯详情数据
 */
export const getHousesNewsDetail = (vueExample) => {
    return detailData('webapp/housesnewsdetail', vueExample)
}

/**
 * 获取户型列表数据
 */
export const getDoorList = (vueExample) => {
    return listData('webapp/doorlist', vueExample)
}

/**
 * 获取户型详情数据
 */
export const getDoorDetail = (vueExample) => {
    return detailData('webapp/doordetail', vueExample)
}

/**
 * 获取户型分类
 */
export const getDoorFilter = (id) => {
    return get('webapp/doorfilter', {
        aid: id
    })
}

/**
 * 获取相册分类
 */
export const getPhotoFilter = (id) => {
    return get('webapp/photofilter', {
        aid: id
    })
}

/**
 * 获取楼盘资讯分类
 */
export const getNewsFilter = (id) => {
    return get('webapp/newsfilter', {
        aid: id
    })
}

/**
 * 获取楼盘图库数据
 */
export const getHousesPhoto = (vueExample) => {
    return listData('webapp/housesphoto', vueExample)
}

/**
 * 获取特价房列表数据
 */
export const getSpecialList = (vueExample) => {
    return listData('webapp/speciallist', vueExample)
}

/** 
 * 获取特价房详情数据
 */
export const getSpecialDetail = (vueExample) => {
    return detailData('webapp/specialdetail', vueExample)
}

/**
 * 获取楼盘问答数据
 */
export const getHousesAsk = (vueExample) => {
    return listData('webapp/housesask', vueExample)
}

/**
 * 获取楼盘历史价格
 */
export const getHousesPrices = (vueExample) => {
    return listData('webapp/housesprices', vueExample)
}

/**
 * 全景看房
 */
export const getHousesPano = (vueExample) => {
    return listData('webapp/housespano', vueExample)
}

/**
 * 全景看房详情
 */
export const getHousesPanoDetail = (vueExample) => {
    return detailData('webapp/housespanodetail', vueExample)
}

/**
 * 获取红包列表页数据
 */
export const getHousesRed = (vueExample) => {
    return listData('webapp/redlist', vueExample)
}

/**
 * 获取小区列表数据
 */
export const getXiaoquList = (vueExample) => {
    return listData('webapp/xiaoqulist', vueExample)
}

/**
 * 获取小区详情数据
 */
export const getXiaoquDetail = (vueExample) => {
    return detailData('webapp/xiaoqudetail', vueExample)
}

/**
 * 获取小区成交二手房数据
 */
export const getSaleDeal = (vueExample) => {
    return listData('webapp/saledeal', vueExample)
}

/**
 * 获取小区成交出租数据
 */
export const getRentDeal = (vueExample) => {
    return listData('webapp/rentdeal', vueExample)
}

/**
 * 获取问答列表
 */
export const getAskList = (vueExample) => {
    return listData('webapp/asklist', vueExample)
}

/**
 * 获取问答详情
 */
export const getAskDetail = (vueExample) => {
    return detailData('webapp/askdetail', vueExample)
}

/**
 * 设置回答为最佳
 */
export const postAskSolved = (params) => {
    return post('manswermanage/save', params)
}

/**
 * 获取经纪人列表数据
 */
export const getBrokerList = (vueExample) => {
    return listData('webapp/brokerlist', vueExample)
}

/**
 * 获取经纪人详情数据
 */
export const getBrokerDetail = (vueExample) => {
    return detailData('webapp/brokerdetail', vueExample)
}

/**
 * 获取经纪公司列表数据
 */
export const getAgencyList = (vueExample) => {
    // 增加参数
    vueExample.filterParams = {...vueExample.filterParams, usertype: 17}
    return listData('webapp/brokerlist', vueExample)
}

/**
 * 获取经纪公司详情数据
 */
export const getAgencyDetail = (vueExample) => {
    return detailData('webapp/brokerdetail', vueExample)
}

/**
 * 获取公司动态列表
 */
export const getCompanyNewsList = (vueExample) => {
    return listData('webapp/mconewsmanage', vueExample)
}

/**
 * 获取公司动态详情
 */
export const getCompanyNewsDetail = (vueExample) => {
    return detailData('webapp/membernewsdetail', vueExample)
}

/**
 * 删除公司动态
 */
export const postDeleteCompanyNews = (id) => {
    return post('mconewsmanage/delete', {
        id: id
    })
}

/**
 * 获取二手房列表数据
 */
export const getSaleList = (vueExample) => {
    return listData('webapp/salelist', vueExample)
}

/**
 * 获取二手房详情数据
 */
export const getSaleDetail = (vueExample) => {
    return detailData('webapp/saledetail', vueExample)
}

/**
 * 获取二手房管理数据
 */
export const getMsalemanage = (vueExample) => {
    return listData('webapp/msalemanage', vueExample)
}

/**
 * 删除二手房
 */
export const postDeleteSale = (id) => {
    return post('msalemanage/delete', {
        id: id
    })
}

/**
 * 二手房置顶
 */
export const postMsalemanageTop = (params) => {
    return post('msalemanage/refreshtop?_form_id=386', params)
}

/**
 * 置顶方案
 */
export const getMsaleTop = () => {
    return get('webapp/msaletop')
}

/**
 * 二手房刷新
 */
export const postMsalemanageRefresh = (params) => {
    return post('msalemanage/refresh?_form_id=385', params)
}

/**
 * 刷新方案
 */
export const getMsaleRefresh = () => {
    return get('webapp/msalerefresh')
}

/**
 * 上下架方案
 */
export const getMsaleValid = () => {
    return get('webapp/msalevalid')
}

/**
 * 二手房上下架保存
 */
export const postSaleValid = (params) => {
    return post('msalemanage/save', params)
}

/**
 * 经纪人二手房(经纪公司管理)
 */
export const getMuserjjdsalelist = (vueExample) => {
    return listData('webapp/muserjjdsalelist', vueExample)
}


/**
 * 获取出租列表数据
 */
export const getRentList = (vueExample) => {
    return listData('webapp/rentlist', vueExample)
}

/**
 * 获取出租详情数据
 */
export const getRentDetail = (vueExample) => {
    return detailData('webapp/rentdetail', vueExample)
}

/**
 * 获取出租管理数据
 */
export const getMrentmanage = (vueExample) => {
    return listData('webapp/mrentmanage', vueExample)
}

/**
 * 删除出租
 */
export const postDeleteRent = (id) => {
    return post('mrentmanage/delete', {
        id: id
    })
}

/**
 * 出租置顶
 */
export const postMrentmanageTop = (params) => {
    return post('mrentmanage/refreshtop?_form_id=386', params)
}

/**
 * 出租刷新
 */
export const postMrentmanageRefresh = (params) => {
    return post('mrentmanage/refresh?_form_id=385', params)
}

/**
 * 出租上下架保存
 */
export const postRentValid = (params) => {
    return post('mrentmanage/save', params)
}

/**
 * 经纪人出租(经纪公司管理)
 */
export const getMuserjjdrentlist = (vueExample) => {
    return listData('webapp/muserjjdrentlist', vueExample)
}

/**
 * 获取写字楼出租列表
 */
export const getBusinessRentList = (vueExample) => {
    // 增加参数
    vueExample.filterParams = {...vueExample.filterParams, czlx: 129}
    return listData('webapp/businessrent', vueExample)
}

/**
 * 获取写字楼出租详情
 */
export const getBusinessRentDetail = (vueExample) => {
    return detailData('webapp/businessrentdetail', vueExample)
}

/**
 * 获取商铺出租列表
 */
export const getBusinessShopRentList = (vueExample) => {
    // 增加参数
    vueExample.filterParams = {...vueExample.filterParams, czlx: 130}
    return listData('webapp/businessrent', vueExample)
}

/**
 * 获取商铺出租详情
 */
export const getBusinessShopRentDetail = (vueExample) => {
    return detailData('webapp/businessrentdetail', vueExample)
}

/**
 * 获取写字楼出售列表
 */
export const getBusinessSaleList = (vueExample) => {
    // 增加参数
    vueExample.filterParams = {...vueExample.filterParams, esflx: 121}
    return listData('webapp/businesssale', vueExample)
}

/**
 * 获取写字楼出售详情
 */
export const getBusinessSaleDetail = (vueExample) => {
    return detailData('webapp/businesssaledetail', vueExample)
}

/**
 * 获取商铺出售列表
 */
export const getBusinessShopSaleList = (vueExample) => {
    // 增加参数
    vueExample.filterParams = {...vueExample.filterParams, esflx: 122}
    return listData('webapp/businesssale', vueExample)
}

/**
 * 获取商铺出售详情
 */
export const getBusinessShopSaleDetail = (vueExample) => {
    return detailData('webapp/businesssaledetail', vueExample)
}

/**
 * 获取新房写字楼列表
 */
export const getBusinessHousesList = (vueExample) => {
    // 增加参数
    vueExample.filterParams = {...vueExample.filterParams, cate_type: 105}
    return listData('webapp/businesshouses', vueExample)
}

/**
 * 获取新房写字楼详情
 */
export const getBusinessHousesDetail = (vueExample) => {
    return detailData('webapp/businesshousesdetail', vueExample)
}

/**
 * 获取新房商铺列表
 */
export const getBusinessShopHousesList = (vueExample) => {
    // 增加参数
    vueExample.filterParams = {...vueExample.filterParams, cate_type: 106}
    return listData('webapp/businesshouses', vueExample)
}

/**
 * 获取新房商铺详情
 */
export const getBusinessShopHousesDetail = (vueExample) => {
    return detailData('webapp/businesshousesdetail', vueExample)
}


/**
 * 获取资讯列表数据
 */
export const getNewsList = (vueExample) => {
    return listData('webapp/newslist', vueExample)
}

/**
 * 获取资讯详情数据
 */
export const getNewsDetail = (vueExample) => {
    return detailData('webapp/newsdetail', vueExample)
}

/**
 * 获取置业指南列表数据
 */
export const getGuideList = (vueExample) => {
    return listData('webapp/guidelist', vueExample)
}

/**
 * 获取置业指南详情数据
 */
export const getGuideDetail = (vueExample) => {
    return detailData('webapp/guidedetail', vueExample)
}

/**
 * 获取团购列表数据
 */
export const getGroupbuyList = (vueExample) => {
    return listData('webapp/groupbuylist', vueExample)
}

/**
 * 获取团购详情数据
 */
export const getGroupbuyDetail = (vueExample) => {
    return detailData('webapp/groupbuydetail', vueExample)
}

/**
 * 获取看房团列表数据
 */
export const getTopicgroupList = (vueExample) => {
    return listData('webapp/topicgrouplist', vueExample)
}

/**
 * 获取看房团详情数据
 */
export const getTopicgroupDetail = (vueExample) => {
    return detailData('webapp/topicgroupdetail', vueExample)
}

/**
 * 查房价
 */
export const getCfj = () => {
    return get('webapp/cfj')
}

/**
 * 获取帮助中心列表数据
 */
export const getServiceList = (vueExample) => {
    return detailData('webapp/servicelist', vueExample)
}

/**
 * 获取帮助中心详情数据
 */
export const getServiceDetail = (vueExample) => {
    return detailData('webapp/servicedetail', vueExample)
}

/**
 * 获取帮助中心详情数据
 */
export const getServiceName = (params) => {
    return get('webapp/servicename', params)
}

/**
 * 获取需求列表数据
 */
export const getDemandList = (vueExample) => {
    return listData('webapp/demandlist', vueExample)
}

/**
 * 获取需求详情数据
 */
export const getDemandDetail = (vueExample) => {
    return detailData('webapp/demanddetail', vueExample)
}

/**
 * 获取分销列表数据
 */
export const getSellList = (vueExample) => {
    return listData('webapp/selllist', vueExample)
}

/**
 * 获取分销详情数据
 */
export const getSellDetail = (vueExample) => {
    return detailData('webapp/selldetail', vueExample)
}

/**
 * 获取图库列表数据
 */
export const getPhotoList = (vueExample) => {
    return listData('webapp/photolist', vueExample)
}

/**
 * 获取图库详情数据
 */
export const getPhotoDetail = (vueExample) => {
    return detailData('webapp/photodetail', vueExample)
}

/**
 * 获取视频列表数据
 */
export const getVideoList = (vueExample) => {
    return listData('webapp/videolist', vueExample)
}

/**
 * 获取视频详情数据
 */
export const getVideoDetail = (vueExample) => {
    return detailData('webapp/videodetail', vueExample)
}

/**
 * 获取学校列表数据
 */
export const getSchoolList = (vueExample) => {
    return listData('webapp/schoollist', vueExample)
}

/**
 * 获取学校详情数据、获取周边详情数据
 */
export const getSchoolDetail = (vueExample) => {
    return detailData('webapp/schooldetail', vueExample)
}


/**
 * 获取收藏数据
 */
export const getCollectList = (vueExample) => {
    return listData('webapp/collect', vueExample)
}

/**
 * 收藏功能
 */
export const collectSave = (params = {}) => {
    return post('collects/save', params)
}

/**
 * 取消收藏功能
 */
export const collectDelete = (id) => {
    return get('collects/delete', {
        id: id
    })
}

/**
 * 获取附近房源
 */
export const getLocationData = (vueExample) => {
    return listData('webapp/location', vueExample)
}

/**
 * 猜你喜欢
 */
export const getMemberCnxh = () => {
    return get('webapp/membercnxh')
}

/**
 * 获取消费记录数据
 */
export const getMspendmanage = (vueExample) => {
    return listData('webapp/mspendmanage', vueExample)
}

/**
 * 获取刷新置顶记录
 */
export const getTopRefreshList = (vueExample) => {
    return listData('webapp/toprefresh', vueExample)
}

/**
 * 获取兑换信息
 */
export const getCashing = (ename) => {
    return get('webapp/cashing', {
        ename: ename
    })
}

/**
 * 获取订单列表
 */
export const getOrderList = (vueExample) => {
    return listData('webapp/orderlist', vueExample)
}

/**
 * 生成订单
 */
export const getPaymentOrder = (params) => {
    return get('admin/webapp/pay', params)
}

/**
 * 重新支付获取订单
 */
export const getRepaymentOrder = (id) => {
    return get('admin/webapp/repay', {
        id: id
    })
}

/**
 * 经纪人升级方案
 */
export const getMuagentmanage = () => {
    return get('webapp/muagentmanage')
}

/**
 * 获取会员升级列表
 */
export const getMuserupgradeAgent = () => {
    return get('webapp/muserupgradeagent')
}

/**
 * 获取所属经纪公司
 */
export const getMusermycomlist = (vueExample) => {
    return listData('webapp/musermycomlist', vueExample)
}

/**
 * 申请所属经纪公司
 */
export const postCompanyApply = (params) => {
    return post('musermycomlist/save', params)
}

/**
 * 获取经纪人申请列表
 */
export const getMuseragentlistnc = (vueExample) => {
    return listData('webapp/museragentlistnc', vueExample)
}

/**
 * 经纪人申请审核
 */
export const postMusermycomlistSave = (params) => {
    return post('musermycomlist/save', params)
}

/**
 * 浏览量(确保路由的命名规则是完全按照pc的规则来即可)
 */
export const addClickNum = (vueExample) => {
    const id = vueExample.$route.query.id
    const path = vueExample.$router.currentRoute.path.split('_')
    let url = null
    if (vueExample.url) {
        url = vueExample.url
    } else {
        url = path.length >= 3 && path[1] + '/' + path[2]
    }
    if (!url) { return }
    get(url, {
        id: id
    }).then(data => {}).catch(error => {})
}

/**
 * 获取筛选条件数据
 */
export const getFilter = (tag) => {
    return get('webapp/filter', {
        tag: tag
    })
}

/**
 * 获取验证码
 */
export const getCaptcha = (name) => {
    return get('manage/captcha', {
        name: name
    })
}

/**
 * 获取表单
 */
export const getForm = (form, params = {}) => {
    return get('webapp/form', {
        ...params,
        formflag: form
    })
}

/**
 * 提交表单
 */
export const sendForm = (url, data) => {
    return post(url, data)
}

/**
 * 搜索关联数据
 */
export const searchData = (url, params) => {
    return get(url, params)
}

/**
 * 获取ajaxbind下级数据
 */
export const getAjaxBind = (params = {}) => {
    return get('admin/ajaxbind/index', params)
}

/**
 * 获取表单token值
 */
export const getToken = () => {
    return get('webapp/token')
}

/**
 * 获取短信类型
 */
export const getTelTpl = (tpl) => {
    return get('webapp/teltpl', {
        tpl: tpl
    })
}

/**
 * 获取手机短信验证码
 */
export const getTelCode = (tpl, tel, params) => {
    return post('admin/sms/smstpl', {
        tel: tel,
        tpl: tpl,
        id: 'smscode',
        checked: 1,
        ...params
    })
}

/**
 * 获取邮箱验证码
 */
export const getEmailCode = (tpl, email) => {
    return post('admin/sms/mailtpl', {
        tpl: 'resetpwd',
        id: 'smscode',
        checked: 1,
        reg: 1,
        mail: email
    })
}

/**
 * 获取地图中心点坐标
 */
export const getMapCenter = () => {
    return get('webapp/mapcenter')
}

/**
 * 获取评论数据
 */
export const getCommentList = (vueExample) => {
    return listData('webapp/intercomment', vueExample)
}

/**
 * 获取回复数据
 */
export const getCommentReply = (params) => {
    return get('webapp/intercomment', params)
}

/**
 * 提交评论（店铺管理回复使用）
 */
export const postCommentSave = (params) => {
    return post('interaction/savely?_form_id=209', params)
}

/**
 * 点赞
 */
export const getVoteNum = (params = {}) => {
    return get('viewinter/vote', params)
}

/**
 * 获取认证类型
 */
export const getUserAuth = () => {
    return get('webapp/userauth')
}

/**
 * 登录
 */
export const bindUsers = (params) => {
    return post('admin/webapp/bind', params)
}

/**
 * 账号密码登录
 */
export const sendLogin = (username, password) => {
    return post('admin/webapp/logina', {
        userName: username,
        passWord: password,
    })
}

/**
 * 手机登录
 */
export const sendLoginTel = (tel, code) => {
    return post('admin/webapp/logina', {
        type: 1,
        userName: tel,
        vcode: code
    })
}

/**
 * 自动登录
 */
export const autoLogin = (ciphertext) => {
    return post('admin/webapp/autologin', {
        ciphertext: ciphertext
    })
}

/**
 * 退出登录
 */
export const getLogout = () => {
    return get('admin/webapp/logout')
}

/**
 * 第三方登录协议
 */
export const getLoginXy = () => {
    return get('webapp/loginxy')
}

/**
 * 注册
 */
export const register = (params = {}) => {
    return post('register/save?findType=1&_form_id=251', params)
}

/**
 * 获取注册说明数据
 */
export const registerXy = () => {
    return get('webapp/registerxy')
}

/**
 * 获取注册隐私协议数据
 */
export const registerPrivacy = () => {
    return get('webapp/registerprivacy')
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
    return get('webapp/userinfo')
}

/**
 * 用户绑定
 */
export const weixinBindUser = (params) => {
    return post('admin/webapp/bind', {...params})
}

/**
 * 获取id
 */
export const getSessionId = () => {
    return get('admin/webapp/getSessionId')
}

/**
 * 检验id
 */
export const checkSessionId = (params) => {
    return post('admin/webapp/checkSessionId',params)
}

/**
 * 获取我的佣金
 */
export const getMuserbrokeragelist = (vueExample) => {
    return listData('webapp/muserbrokeragelist', vueExample)
}

/**
 * 我的下级分销
 */
export const getMusersubordinate = (vueExample) => {
    return listData('webapp/musersubordinate', vueExample)
}

/**
 * 我的下级
 */
export const getMusersellsubordinate = (vueExample) => {
    return listData('webapp/musersellsubordinate', vueExample)
}

/**
 * 佣金提取列表
 */
export const getMuserextract = (vueExample) => {
    return listData('webapp/muserextract', vueExample)
}

/**
 * 获取邀请链接
 */
export const getMuserselllinklist = () => {
    return get('webapp/muserselllinklist')
}


/**
 * 我的分销
 */
export const getMuserselllist = (vueExample) => {
    return listData('webapp/muserselllist', vueExample)
}

/**
 * 委托列表
 */
export const getMentrustlist = (vueExample) => {
    return listData('webapp/mentrustlist', vueExample)
} 

/**
 * 加载委托会员
 */
export const getMentrustarcloading = (vueExample) => {
    return listData('webapp/mentrustarcloading', vueExample)
}

/**
 * 确认委托经纪人
 */
export const postMentrustarcSave = (params) => {
    return post('mentrustarc/save', params)
}

/**
 * 接收委托
 */
export const postMsaleconSave = (params) => {
    return post('msalecon/save', params)
}

/**
 * 获取需求信息管理数据
 */
export const getMdemandmanage = (vueExample) => {
    return listData('webapp/mdemandmanage', vueExample)
}

/**
 * 需求上下架
 */
export const postDemandValid = (params) => {
    return post('mdemandmanage/save', params)
}

/**
 * 删除需求信息
 */
export const postDeleteDemand = (id) => {
    return post('mdemandmanage/delete', {
        id: id
    })
}

/**
 * 获取新版本链接
 */
export const getVersion = () => {
    return get('webapp/version')
}

/**
 * 获取领取红包数据
 */
export const getMredenroll = (vueExample) => {
    return listData('webapp/mredenroll', vueExample)
}

/**
 * 获取红包管理数据
 */
export const getMredmanage = (vueExample) => {
    return listData('webapp/mredmanage', vueExample)
}

/**
 * 获取房源预约数据
 */
export const getMsalearc = (vueExample) => {
    return listData('webapp/msalearc', vueExample)
}

/**
 * 删除房源预约
 */
export const postDeleteMsalearc = (id) => {
    return post('msalearc/delete', {
        id: id
    })
}

/**
 * 团购报名
 */
export const getMgroupordermanage = (vueExample) => {
    return listData('webapp/mgroupordermanage', vueExample)
}

/**
 * 团购管理列表
 */
export const getMgroupbuymanage = (vueExample) => {
    return listData('webapp/mgroupbuymanage', vueExample)
}

/**
 * 删除团购
 */
export const postDeleteGroupbuy = (id) => {
    return post('mgroupbuymanage/delete', {
        id: id
    })
}

/**
 * 看房团报名
 */
export const getMshowingsnewsmanage = (vueExample) => {
    return listData('webapp/mshowingsnewsmanage', vueExample)
}

/**
 * 我的回答
 */
export const getMuseraskMuseranswer = (vueExample) => {
    return listData('webapp/museraskmuseranswer', vueExample)
}

/**
 * 我的提问
 */
export const getMuseraskMusersasklist = (vueExample) => {
    return listData('webapp/museraskmusersasklist', vueExample)
}

/**
 * 我的代办
 */
export const getMagencymanage = (vueExample) => {
    return listData('webapp/magencymanage', vueExample)
}

/**
 * 楼盘管理
 */
export const getMhousemanage = (vueExample) => {
    return listData('webapp/mhousemanage', vueExample)
} 

/**
 * 删除楼盘
 */
export const postDeleteHouse = (id) => {
    return post('mhousemanage/delete', {
        id: id
    })
}

/**
 * 获取楼盘资讯管理
 */
export const getMnewmanage = (vueExample) => {
    return listData('webapp/mnewmanage', vueExample)
}

/**
 * 删除楼盘推荐
 */
export const postDeleteHousesarc = (params) => {
    return post('mhousesarc/delete', params)
}

/**
 * 推荐楼盘资讯到楼盘首页
 */
export const postMnewmanagePush = (params) => {
    return post('mhousesarc/save', params)
}

/**
 * 删除楼盘资讯
 */
export const postDeleteHouseNews = (id) => {
    return post('mnewmanage/delete', {
        id: id
    })
}

/**
 * 获取楼盘印象数据
 */
export const getMinterimpressmanage = (vueExample) => {
    return listData('webapp/minterimpressmanage', vueExample)
}

/**
 * 获取楼盘印象数据
 */
export const getHousesImpress = (params) => {
    return get('webapp/housesimpress', params)
}

/**
 * 删除楼盘印象
 */
export const postDeleteMinterimpressmanage = (id) => {
    return post('minterimpressmanage/delete', {
        id: id
    })
}

/**
 * 获取楼盘点评管理数据
 */
export const getMcommentmanage = (vueExample) => {
    return listData('webapp/mcommentmanage', vueExample)
}

/**
 * 获取楼盘点评管理数据
 */
export const getMcommentmanageReply = (params) => {
    return get('webapp/mcommentmanage', params)
}

/**
 * 提交评论（楼盘评论管理回复使用）
 */
export const postMcommentmanageSave = (params) => {
    return post('mcommentmanage/save?_form_id=128', params)
}

/**
 * 获取楼盘意向管理
 */
export const getMinterintentmanage = (vueExample) => {
    return listData('webapp/minterintentmanage', vueExample)
}

/**
 * 代管人数调用
 */
export const getAgencynum = (vueExample) => {
    return get('webapp/agencynum')
}
/**
 * 经纪人二手房
 */
export const getJdetail = (vueExample) => {
  return listData('webapp/jdetail', vueExample)
}
/**
 * 经纪公司二手房
 */
export const getmemberdetail = (vueExample) => {
  return listData('webapp/memberdetail', vueExample)
}
/**
 * 经纪人出租房
 */
export const getJrdetail= (vueExample) => {
  return listData('webapp/jrdetail', vueExample)
}
/**
 * 经纪公司出租房
 */
export const getMrdetail = (vueExample) => {
  return listData('webapp/mrdetail', vueExample)
}

// geetest验证码
export const geetest = () => {
    return get('common/geetest', {
        t: (new Date()).getTime()
    })
}

/**
 * 获取小程序二维码
 */
export const getCodeById = (params) => {
    return get ('admin/webapp/qrcodexcx',params)
}

/**
 * 二手房带看
 */
export const getSaleViewList = (vueExample) => {
    return listData('webapp/saleviewlist', vueExample)
}

/**
 * 二手房咨询底价列表
 */
export const getSaleXprice = (vueExample) => {
    return listData('webapp/salexpricelist', vueExample)
}


/**
 * 删除二手房带看
 */
export const postDeleteSaleView = (id) => {
    return post('Msaleview/delete', {
        id: id
    })
}

/**
 * 删除二手房咨询底价
 */
export const postDeleteSaleXprice = (id) => {
    return post('msalexprice/delete', {
        id: id
    })
}
/**
 * 学校二手房
 */
export const getSchollSaleList = (vueExample) => {
    return listData('webapp/xsalelist', vueExample)

}
/**
 * 学校出租房
 */
export const getSchollRentList = (vueExample) => {
    return listData('webapp/xrentlist', vueExample)

}
