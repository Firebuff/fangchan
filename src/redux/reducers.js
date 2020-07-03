import { PLUS, MINUS } from './action-type'
import { combineReducers } from 'redux'


const initState = {
    total: 100
}

function product (state = initState, action) {
    switch (action.type) {
        case PLUS: 
            
            return {...state, total:(state.total + action.data)}
        case MINUS: 
            return {...state, total:(state.total - action.data)}

        default: 
            return state

    }
}

export default combineReducers({product})