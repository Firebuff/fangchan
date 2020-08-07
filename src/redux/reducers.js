import {
    LOADMORE,
    CLEARHOUSELIST,
    SETPAGEINDEX,
    ISMORE,
    CLEARLIST,
    SETREQUESTPARAMS,
    SETCSRF,
    SETUSERINFO,
    SETLOGIN
} from './action-type';
import {combineReducers} from 'redux';

const initHouseListData = {
    list: [],
    requestParams: {
        pageIndex: 1,
    },
    isMore: true,
};

function houseListData(state = initHouseListData, action) {
    switch (action.type) {
        // 加载更多数据
        case LOADMORE:
            let list = [...state.list, ...action.data];
            return {...state, list: list};

        // 清空列表数据，清空搜索条件
        case CLEARHOUSELIST:
            let returnParam = {...state.requestParams, pageIndex: 1};

            // console.log({...state, list: [], requestParams: returnParam })
            return {...state, list: [], requestParams: returnParam};

        // 设置当前请求数据的页数
        case SETPAGEINDEX:
            let params = {...state.requestParams, pageIndex: action.data};
            return {...state, requestParams: params};

        // 是否加载更多
        case ISMORE:
            return {...state, isMore: action.data};
        // 设置请求参数
        case SETREQUESTPARAMS:
            return {...state, requestParams: action.data};

        default:
            return state;
    }
}

const global = {
    CSRF: '',
    userInfo: {},
    longin: false
};

function globalHouseData(state = global, action) {
    switch (action.type) {
        case SETCSRF:
            return {...state, CSRF: action.data};
        case SETUSERINFO:
            return {...state, userInfo: action.data};
        case SETLOGIN:
            return {...state, login: action.data};
        default:
            return state;
    }
}

export default combineReducers({houseListData, globalHouseData});
