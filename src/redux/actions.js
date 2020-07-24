import { LOADMORE, CLEARHOUSELIST, ISMORE, SETPAGEINDEX,  CLEARLIST, SETREQUESTPARAMS } from './action-type'

import { getHouseList } from '../api';

export  const setMoreHouseList =  (data) => {
	return {
		type: LOADMORE,
		data: data
	}
}



//清空列表数据 以及搜索条件
export const clearAll = () => {
	return {
		type: CLEARHOUSELIST,
		data: []
	}
}

export const setQuestParam = (data) => {
	return {
		type: SETREQUESTPARAMS,
		data: data
	}
}

// 设置请求的页数
export const setPageIndex  = (data) => {
	return {
		type: SETPAGEINDEX,
		data: data
	}
}


// 设置是否请求更多
export const setIsMore  = (data) => {
	return {
		type: ISMORE,
		data: data
	}
}




//export const loadHouseList = (params) => {
	
//	let { currentPageIndex, requestParams, isMore, refresh } = params

//	if (refresh) {
//		return async function (dispatch) {
//			dispatch(clearAll())
//			let res = await getHouseList(params)
//			console.log(res)
//			if (res.status == 1) {
//				dispatch(setMoreHouseList(res.data))
//			}
//		}
//	} else {
//		//如果是最后一页
//		if (!isMore) return setIsMore(false)
//		return async function (dispatch) {
			
//			let res = await getHouseList(params)
//			console.log(res)
//			if (res.status == 1) {
//				dispatch(setMoreHouseList(res.data))
//				// 如果当前页是最后一页
//				if (currentPageIndex == res.pageAllIndex) {
//					console.log('end')
//					dispatch(setIsMore(false))
//				} else {
//					console.log('plus')
//					dispatch(setPageIndex(currentPageIndex + 1))
//				}
//			}
//		}
//	}
	
	
//}
