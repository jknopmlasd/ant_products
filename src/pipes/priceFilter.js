export const priceFilter = (arr, min,max) => {
    if(!min && !max) return arr;

    return arr.filter(product => product.price>=min && product.price<=max);
};