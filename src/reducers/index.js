import {combineReducers} from 'redux';
import shop from './shop.reducer';
import {brandFilterReducer} from "./brand.filter.reducer";
import {orderByPriceReducer} from "./orderByPrice.filter.reducer";
import {paginationReducer} from "./pagination.reducer";
import {priceFilterReducer} from "./price.filter.reducer";
export default combineReducers({
    shop,
    brandFilter: brandFilterReducer,
    orderBy: orderByPriceReducer,
    pagination: paginationReducer,
    priceFilter:priceFilterReducer
});
