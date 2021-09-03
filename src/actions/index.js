import axios from "axios";
//Store 
export const ADD_PRODUCTS_TO_STORE = 'ADD_PRODUCTS_TO_STORE';
export const LOADING='LOADING';




const BASE_URL="https://fulfillant.com/react-api/";

export const fetchProductsFromApi = (config) => {
        console.log(config);
        
        
    return (dispatch)=>{
        dispatch(loading(1));
        let url=BASE_URL+"getProducts";
        if(config){
         let queryString = Object.keys(config).map(key => key + '=' + config[key]).join('&');
        url+="?"+queryString;
        }
        console.log(config);
        console.log(url);
   axios.get(url).then(res=>{
        dispatch(addProductsToStore(res.data.products));
        dispatch(loading(0));
        console.log("will dispatch add p to store",res);
    }).catch(error=>{
        console.log(error);
        dispatch(loading(0));

    });
    


}
};




//Store
export const addProductsToStore= products=>{
    
    return {
        type: ADD_PRODUCTS_TO_STORE,
        payload: products
    }

}

export const loading=(x)=>{
    return {
        type: LOADING,
        payload:x
    }

}


//Cart
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
export const INCREMENT_CART_ITEM_QUANTITY = 'INCREMENT_CART_ITEM_QUANTITY';
export const DECREMENT_CART_ITEM_QUANTITY = 'DECREMENT_CART_ITEM_QUANTITY';
export const GET_PRODUCT_FROM_API = 'GET_PRODUCT_FROM_API';
export const addProductToCart = product => {
    return {
        type: ADD_PRODUCT_TO_CART,
        payload: product
    }
};

export const removeProductToCart = productId => {
    return {
        type: REMOVE_PRODUCT_FROM_CART,
        payload: productId
    }
};

export const incrementCartQuantity = productId => {
    return{
        type: INCREMENT_CART_ITEM_QUANTITY,
        payload: productId
    }
};

export const decrementCartQuantity = productId => {
  return {
      type: DECREMENT_CART_ITEM_QUANTITY,
      payload: productId
  }
};



//Filter
export const ADD_BRAND_TO_FILTER = 'ADD_BRAND_TO_FILTER';
export const REMOVE_BRAND_FROM_FILTER = 'REMOVE_BRAND_FROM_FILTER';
export const addBrandToFilter = brand => {
    return {
        type: ADD_BRAND_TO_FILTER,
        brand
    }
};


export const removeBrandFromFilter = brand => {
    return  {
        type: REMOVE_BRAND_FROM_FILTER,
        brand
    }
};

//Order
export const ORDER_BY_ASC = 'ORDER_BY_ASC';
export const ORDER_BY_DESC = 'ORDER_BY_DESC';
export const CLEAR_ORDER_BY_PRICE = 'CLEAR_ORDER_BY_PRICE';

export const orderByAsc = () => {
    return {
        type: ORDER_BY_ASC
    }
};



export const orderByDesc =  () => {
    return {
        type: ORDER_BY_DESC
    }
};

export const clearOrderBy = () => {
    return {
        type: CLEAR_ORDER_BY_PRICE
    }
};


export const PREV_PAGE = 'PREV_PAGE';
export const NEXT_PAGE = 'NEXT_PAGE';
export const GO_PAGE = 'GO_PAGE';
export const COUNT_ITEM = 'COUNT_ITEM';


export const nextPage = () => {
    return {
        type: NEXT_PAGE
    }
};

export const prevPage = () => {
    return {
        type: PREV_PAGE
    }
};

export const goPage = (n) => {
    return {
        type: GO_PAGE,
        currentPage: n
    }
};

export const countItem = (n) => {
    return {
        type: COUNT_ITEM,
        totalItemsCount: n
    }
}
