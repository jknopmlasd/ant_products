import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import { GET_PRODUCT_FROM_API } from '../../actions';
import ProductDetailComponent from '../../components/ProductDetail/ProductDetail';
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import {fetchProductsFromApi} from "../../actions/index";
const ProductDetail = (props) => {

    console.log(props);

    useEffect(() => {
    if(!props.product){
        console.log("will fetch product",props);
        let id=props.match.params.id;
        props.fetchProducts({id});
    }    
    console.log(props);    
      },);

      if(props.product){
    return (
        
         <div className="container" style={{padding: '6rem 0'}}>
            <div className="card">
                <div className="row">
                    <ProductSlider images={props.product.images}/>
                    <ProductDetailComponent product={props.product}/>
                </div>
            </div>
        </div>
    );}else{
        return (
            <div className="container" style={{padding: '6rem 0'}}>
            No Product found
        </div>
        );

    }
};

const mapStateToProps = (state, props) =>  {

    const product = state.shop.products.find(product => product.id === +props.match.params.id);

    return {
        product,"sw":"adasd"
    }
};

const mapDispatchToProps=dispatch=>{
    return {
       fetchProducts:(x)=>dispatch(fetchProductsFromApi(x))
   
   
    } 
   
   }

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetail);
