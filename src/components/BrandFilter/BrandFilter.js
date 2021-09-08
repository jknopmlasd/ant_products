import React, {Component} from 'react';
import {connect} from 'react-redux';
import './BrandFilter.scss';
import {brands} from "../../data/brands";
import {addBrandToFilter, removeBrandFromFilter} from "../../actions";


const BrandFilter = (props) => {

    const {dispatch, brandItemsCount,brnads} = props;
    const handleSelectBox = (e) => {
        const name = e.target.name;
        const value = e.target.checked;

        if(e.target.checked) {
            dispatch(addBrandToFilter(name));
        } else {
            dispatch(removeBrandFromFilter(name));
        }
    };
    
    const handleChange = (e) =>{
        console.log(e.target.value);
        console.log(e.target.name);
       
     

    }
    
    const handleSubmit =(e) =>{
        e.preventDefault();
        dispatch();
    }
        return (
            <div className="row align-items-center">
                
                <h5 className="col-sm-2">Filter by:</h5>
                <div className="dropdown col-sm-4">
                  <button className="btn dropdown-toggle"  type="button" id="filterBar" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">All Brands</button>
        
                  <ul className="dropdown-menu" aria-labelledby="filterBar">
                    {props.brands.map(brand => (
                        <li key={brand} className="dropdown-item border-0">
                            <label className="custom-checkbox text-capitalize"> {brand} ({brandItemsCount[brand]})
                                <input type="checkbox"
                                       name={brand}
                                       className="custom-checkbox__input" onInput={handleSelectBox}/>
                                <span className="custom-checkbox__span"></span>
                            </label>
                        </li>
                    ))}
                </ul>
                </div>
                <div className="col-sm-6">
                    
                    <form className="row" onSubmit={handleSubmit}>
                        <label className="col-sm-3">Price:</label>
                        <input className="col-sm-3" type="number" placeholder="min" min="0" name="min" required onChange={handleChange}/>
                        <input className="col-sm-3" type="number" placeholder="max" min="0" name="max" required onChange={handleChange}/>
                        <button className="col-sm-3" type="submit">Confirm</button>
                    </form>
                </div>
            </div>

        );

};

const mapStateToProps = (state) => {

    const brandItemsCount = {};

    state.shop.products && state.shop.products.forEach(p => {
        brandItemsCount[p.brand] = brandItemsCount[p.brand] + 1 || 1;
    });


    return {
        brandItemsCount,
        brands:state.shop.brands
    }

};

export default connect(mapStateToProps)(BrandFilter);