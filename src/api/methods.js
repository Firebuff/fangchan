import qs from 'qs'

const baseUrl = 'https://house.08cms.com/'
//const baseUrl = 'https://house.08cms.com/'

export const get = (controller, params = {}) => {
    // 参数拼接
    let requestParams = qs.stringify({...params, _area: '247'})

    let url = `${baseUrl}${controller}?${requestParams}`

    return fetch(url, {
        method: 'Get',
    }).then((res) => {
        if (res.status != 200) {
            return
        }
        return res.json()
    }).catch( (err) => {
        console.log(`error =>  ${err}`)
    })
}