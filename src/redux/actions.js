import { PLUS, MINUS, GETHOUSElIST } from './action-type'


import { getHouseList } from '../api';

export const plusTotal = function (data) {
	return {
		type: PLUS,
		data: data
	}
}

export const minusTotal = function (data) {
	return {
		type: MINUS,
		data: data
	}
}


export const asyncPlus = function (number) {
	
	return async function (dispatch) {
		
		function KO () {
			return new Promise( (resolve,reject) => {
				setTimeout(() => {
					resolve(21)
				},5000)
			}).catch(err=> {
				console.log(err)
			})
		}

		let a = await KO()

		dispatch(plusTotal(a))
	}

}
