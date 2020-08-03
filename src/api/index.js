import { get } from './methods'

export const getHouseList = (params) => {
    // console.log(params)
    return get('webapp/houseslist', params)
}

export const getFilter = (tag) => {
    return get('webapp/filter',{tag:tag})
}

export const getHouseDetail = (params) => {
    // console.log(params)
    return get('webapp/housesdetail', params)
}

export const getIndex = (params) => {
    // console.log(params)
    return get('webapp/index', params)
}