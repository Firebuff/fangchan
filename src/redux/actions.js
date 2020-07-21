import { PLUS, MINUS, SETHOUSElIST } from './action-type'

import { getHouseList } from '../api';

function setHouseList (data) {
	return {
		type: SETHOUSElIST,
		list: data
	}
}

export const getList = (params) => {
	return async function (dispatch) {
		let res = await getHouseList(params)
		console.log(res)
		if (res.status == 1) {
			dispatch(setHouseList(res.data))
		}
	}
}
