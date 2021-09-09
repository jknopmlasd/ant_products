import { PRICE_FILTER } from "../actions";

export const  priceFilterReducer = (state = '', action) => {
    switch (action.type) {
        case PRICE_FILTER:
            if(action.payload.min) 
            console.log("min in price reducer",action.payload);
            console.log("state",state);
            return {...state, min:action.payload.min,max:action.payload.max };
        
        default:
            return state;
    }
};