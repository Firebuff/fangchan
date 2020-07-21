import { PLUS, MINUS, SETHOUSElIST } from './action-type'
import { combineReducers } from 'redux'


//const initState = {
//    total: 100
//}

//function product (state = initState, action) {
//    switch (action.type) {
//        case PLUS: 
            
//            return {...state, total:(state.total + action.data)}
//        case MINUS: 
//            return {...state, total:(state.total - action.data)}

//        default: 
//            return state

//    }
//}

const initHouseListData = {
    list: [],
    pageIndex: 1,
    selectParams: {}
}

function houseListData (state = initHouseListData, action) {
    switch (action.type) {
        case SETHOUSElIST:
            let list = [...list,...action.list]
            return {...state, list: list}
        default: 
            return state
    }
}



export default combineReducers({houseListData})