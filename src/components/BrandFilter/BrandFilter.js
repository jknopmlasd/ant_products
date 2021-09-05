import React, {Component} from 'react';
import {connect} from 'react-redux';
import './BrandFilter.scss';
import {brands} from "../../data/brands";
import {addBrandToFilter, removeBrandFromFilter} from "../../actions";


const BrandFilter = (props) => {

    const {dispatch, brandItemsCount} = props;
    const handleSelectBox = (e) => {
        const name = e.target.name;
        const value = e.target.checked;

        if(e.target.checked) {
            dispatch(addBrandToFilter(name));
        } else {
            dispatch(removeBrandFromFilter(name));
        }
    };


        return (
            <div className="d-flex align-items-center">
                
                    <h4>Brands:</h4>
                
                <ul className="list-group flex-row">
                    {brands.map(brand => (
                        <li key={brand} className="list-group-item border-0">
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
        );

};

const mapStateToProps = (state) => {

    const brandItemsCount = {};

    state.shop.products && state.shop.products.forEach(p => {
        brandItemsCount[p.brand] = brandItemsCount[p.brand] + 1 || 1;
    });


    return {
        brandItemsCount
    }

};

export default connect(mapStateToProps)(BrandFilter);