import React, {Component} from 'react';
import {connect} from 'react-redux';
import Product from "../../components/Product/Product";

import {brandFilter} from "../../pipes/brandFilter";
import {priceFilter} from "../../pipes/priceFilter";
import {orderByFilter} from "../../pipes/orderByFilter";
import LayoutMode from "../../components/LayoutMode/LayoutMode";
import {paginationPipe} from "../../pipes/paginationFilter";
import Pagination from "../../components/Pagination/Pagination";
import {fetchProductsFromApi} from "../../actions/index";
class ProductList extends Component {

    state = {
        colValue : 'col-lg-4',
        perPage: 12,
        currentPage: 1,
        pagesToShow: 3,
        gridValue: 3
    };

    componentDidMount(){
    console.log(this.props);  
    this.props.fetchProducts({});
    }

    changeLayout = (n) => {
        this.setState({gridValue: n});

        let realGridValue;

        if(n === 4) {
            realGridValue = 3
        } else {
            realGridValue = 4;
        }

      this.setState({
          colValue: `col-lg-${realGridValue}`
      });
    };


    onPrev = () => {
        const updatedState = {...this.state};
        updatedState.currentPage = this.state.currentPage - 1;
        this.setState(updatedState);
    };


    onNext = () => {
        this.setState({
            ...this.state,
            currentPage: this.state.currentPage + 1
        });
    };

    goPage = (n) => {
        this.setState({
            ...this.state,
            currentPage: n
        });
    };


    render() {

        let isActive = this.state.colValue[this.state.colValue.length -1];

        if(this.props.product_loading){

            return (<div><h3>Loading</h3>
                <img src="/loading.gif"/></div>);
        }else{

            if(!this.props.products || this.props.products.length===0){

                return (<div><h2>No Product Found</h2></div>);
            }else{
                return (
                    <div className="col-lg-12">
                        <div className="row mb-3">
                            <div className="col-12 d-none d-lg-block d-xl-block">
                                <div className="card ">
                                    <div className="card-header d-flex justify-content-end">
                                        <span className="mr-3">Change Layout: </span>
                                        <LayoutMode len={3} isActive={this.state.gridValue === 3} click={this.changeLayout} />
                                        <LayoutMode len={4} isActive={this.state.gridValue === 4}  click={this.changeLayout} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                        
                            {this.props.products && paginationPipe(this.props.products, this.state).map(product =>{
                                let classes = `${this.state.colValue} col-md-6 mb-4`;
                                return (<div key= {product.id} className={classes}>
                                    <Product key={product.id} product={product} />
                                </div>)
                            })}
                        
                        
                         
                        </div>
                        <div className="d-flex justify-content-end">
                            <Pagination
                                totalItemsCount={this.props.products.length}
                                currentPage={this.state.currentPage}
                                perPage={this.state.perPage}
                                pagesToShow={this.state.pagesToShow}
                                onGoPage={this.goPage}
                                onPrevPage={this.onPrev}
                                onNextPage={this.onNext}
                            />
                        </div>
                    </div>
                );


            }   

        }



        
    }
}

const mapStateToProps = state => {
    const brands = state.brandFilter.brands;
    const orderBy = state.orderBy;
    const allProducts=state.shop.products;
    const filterByBrandArr = brandFilter(allProducts, brands);
    const filterByPriceArr = priceFilter(filterByBrandArr, state.priceFilter.min,state.priceFilter.max);
    const filterByOrderArr = orderByFilter(filterByPriceArr, orderBy);


    return {products: filterByOrderArr,product_loading:state.shop.product_loading }
};

const mapDispatchToProps=dispatch=>{
 return {
    fetchProducts:(x)=>dispatch(fetchProductsFromApi(x))


 } 

}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
