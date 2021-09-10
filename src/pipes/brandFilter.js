export const brandFilter = (arr, brands) => {
    if(!brands) return arr;
    
    const selectedBrands=brands.flatMap((brand)=>brand.selected=="Y"?[brand.value]:[]);



if(!selectedBrands || selectedBrands.length==0) return arr;


const filtered=arr.filter(product => selectedBrands.includes(product.brand));

return filtered;
};