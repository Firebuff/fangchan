import { get } from './methods'

export const getHouseList = (params) => {
    console.log(params)
    return get('webapp/houseslist', params)
}

export const getFilter = (tag) => {
    return get('webapp/filter',{tag:tag})
}