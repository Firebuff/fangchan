import qs from 'qs'

import store from '../redux/store'

//获取store上面的globalHouseData
const globalHouseData = store.getState().globalHouseData


//const baseUrl = 'https://house.08cms.com/'
const baseUrl = 'https://www.ruianfang.com/'

export const get = (controller, params = {}) => {
    // 参数拼接
    let requestParams = qs.stringify({...params, _area: '247',csrf_token: globalHouseData.CSRF})

    let url = `${baseUrl}${controller}?${requestParams}`

    return fetch(url, {
        method: 'Get',
        credentials: 'include',
        mode: 'cors',
    }).then((res) => {
        console.log(res)
        if (res.status != 200) {
            return
        }
        return res.json()
    }).catch( (err) => {
        console.log(`error =>  ${err}`)
    })
}
export const post = (controller, postData, params = {}) => {
    // 参数拼接
    let requestParams = qs.stringify({...params})

    let url = `${baseUrl}${controller}?${requestParams}`
    let bodyData = {...postData, csrf_token: globalHouseData.CSRF}
    return fetch(url, {
        method: 'Post',
        body: qs.stringify(bodyData),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
        },
        mode: 'cors',
        credentials: 'include'
    }).then((res) => {
        if (res.status != 200) {
            return
        }
        return res.json()
    }).catch( (err) => {
        console.log(`error =>  ${err}`)
    })
}