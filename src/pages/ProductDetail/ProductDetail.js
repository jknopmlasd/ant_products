import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import { GET_PRODUCT_FROM_API } from '../../actions';
import ProductDetailComponent from '../../components/ProductDetail/ProductDetail';
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import {fetchProductsFromApi} from "../../actions/index";
const ProductDetail = (props) => {

    console.log("props are: ",props);

    useEffect(() => {
    if(!props.product){
        let id=props.match.params.id;
        props.dispatch(fetchProductsFromApi({id}));
    }    
      
      },[props.product]);
      if(!props.product_loading){
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
            <h3>No Product Found</h3>
        </div>
        );

    }
        }else{
            return (
                <div className="container" style={{padding: '6rem 0'}}>
                <h3>Loading</h3>
                <img src="/loading.gif"/>
            </div>
            );

        }
};

const mapStateToProps = (state, props) =>  {

    const product = state.shop.products.find(product => product.id === +props.match.params.id);

    return {
        product,
        product_loading:state.shop.product_loading
    }
};

export default connect(mapStateToProps,null)(ProductDetail);
