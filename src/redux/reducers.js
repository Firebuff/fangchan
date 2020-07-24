import { LOADMORE, CLEARHOUSELIST, SETPAGEINDEX, ISMORE,  CLEARLIST, SETREQUESTPARAMS } from './action-type'
import { combineReducers } from 'redux'


const initHouseListData = {
    list: [],
    requestParams: {
        pageIndex: 1,
    },
    isMore: true
}

function houseListData (state = initHouseListData, action) {
    switch (action.type) {
        // 加载更多数据
        case LOADMORE:
            let list = [...state.list,...action.data]
            return {...state, list: list}

        // 清空列表数据，清空搜索条件
        case CLEARHOUSELIST:
            return {...state, ...initHouseListData }

        // 设置当前请求数据的页数
        case SETPAGEINDEX: 
            let params = {...state.requestParams, pageIndex: action.data}
            return {...state, requestParams: params}

        // 是否加载更多
        case ISMORE: 
            return {...state, isMore: action.data}
        // 设置请求参数
        case  SETREQUESTPARAMS: 
            let questParams = {...state.requestParams,...action.data}
            return {...state, requestParams: questParams}

        default: 
            return state
    }
}

export default combineReducers({houseListData})