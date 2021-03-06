import qs from 'qs'
import fetchs from 'cross-fetch';

import store from '../redux/store'

//获取store上面的globalHouseData
const globalHouseData = store.getState().globalHouseData


const baseURL = 'https://house.08cms.com/'


export const get = (url, params = {}) => {

    let requestParams = qs.stringify({ ...params, _area: '247' })

    let requestUrl = `${baseURL}${url}?${requestParams}`

    return fetchs(requestUrl, {
        mode: 'cors',
        method: 'GET',
        credentials: 'include'
    }).then(function(response) {

        if (response.status !== 200) {
            return;
        }
        //检查响应文本
        return response.json()

    }).catch(function(err) {

        Dialog.alert({
            message: err,
        }).then(() => {
            // on close
        });

        console.log("Fetch错误:" + err);
    })
}


export const post = (url, data = {}) => {

    let requestParams = qs.stringify({ _area: '247' })

    let requestUrl = `${baseURL}${url}?${requestParams}`

    // 添加token值
    if (!data.csrf_token) {
        data.csrf_token = globalHouseData.CSRF
    }

    return fetchs(requestUrl, {
        mode: 'cors',
        method: 'POST',
        body: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include'
    }).then(function(response) {
        console.log(response)

        if (response.status !== 200) {
            return;
        }
        //检查响应文本
        return response.json().then((res) => {
            // 如果token值已失效则重新赋值
            if (res.data && res.data.info == "CSRF token 已失效,请重新刷新页面") {
                token()
            }
            return res
        })

    }).catch(function(err) {

        Dialog.alert({
            message: err,
        }).then(() => {
            // on close
        });

        console.log("Fetch错误:" + err);
    })
}
