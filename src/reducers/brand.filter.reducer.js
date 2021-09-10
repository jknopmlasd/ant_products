import {ADD_BRAND_TO_FILTER, REMOVE_BRAND_FROM_FILTER,ADD_BRANDS_TO_STORE,UPDATE_BRAND_FILTER} from "../actions";

export const  brandFilterReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_BRAND_TO_FILTER:
            if(state.includes(action.brand)) return state;
            return state += action.brand;
        case REMOVE_BRAND_FROM_FILTER:
            
            const reg = new RegExp(action.brand, 'gi');
            return state.replace(reg, '');
            case UPDATE_BRAND_FILTER:
                let updatedBrands = [...state.brands];
                updatedBrands=updatedBrands.map(brand=>{
                 if(action.payload.includes(brand.value)){
                   return {value:brand.value,label:brand.label,selected:"Y"};  
                 }else{
                    return {value:brand.value,label:brand.label,selected:"N"};     
                 }   


                });

    
                return {...state, brands: updatedBrands};
            case ADD_BRANDS_TO_STORE:
            return {...state, brands: action.payload};
        default:
            return state;
    }
};

