import React, {useState} from 'react';
import {connect} from 'react-redux';
import './BrandFilter.scss';

import {updateBrandFilter,priceFilter} from "../../actions";

import Select from 'react-select';

const BrandFilter = (props) => {
    console.log(props);
    const {dispatch, brandItemsCount,brands} = props;

    /*
    const brandsOptions= brands.map((brand,i) => {
       return  {value:brand.value,label:brand.label};
     });

     */

     //const brandsOptions= [{"value":1,"label":"A"}];
    
    const brandsOptions= brands;
    
    //const brandsOptionsSelected=brands;

    const brandsOptionsSelected=brands && brands.filter(brand=>brand.selected=="Y");
    
    console.log("db2",brandsOptionsSelected);
    console.log("db3",brandsOptions);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(1000000);

    const handleSelectBox = (e) => {
        //const name = e.target.name;
        //const value = e.target.checked;

        

        const selectedBrands=e.map(i=>{return i.value});
        
        dispatch(updateBrandFilter(selectedBrands));
        return;
       
    };
    
    const handleChange = (e) =>{
        
        if(e.target.name === "min"){setMin(e.target.valueAsNumber)};
        if(e.target.name ==="max"){setMax(e.target.valueAsNumber)};
       
    }
    
    const handleSubmit =(e) =>{
        e.preventDefault();
        
        if(min>max){
          alert("min needs to be smaller than max");
          return;  
        }
        dispatch(priceFilter(min,max));
        

    }
  
        return (
            <div className="row align-items-center">
          
          
                <h5 className="col-sm-2">Filter by:</h5>
                <div className="col-sm-4">
                <Select
                    defaultInputValue={brandsOptionsSelected}
                    onChange={handleSelectBox}
                    options={brandsOptions}
                    isMulti
                    className="basic-multi-select"
                    classNamePrefix="select"
                    />
                </div>
                
                <div className="col-sm-6">
                    
                    <form className="row" onSubmit={handleSubmit}>
                        <label className="col-sm-3">Price:</label>
                        <input className="col-sm-3" type="number"   name="min" placeholder="min" onChange={handleChange}/>
                        <input className="col-sm-3" type="number"   name="max" placeholder="max" onChange={handleChange}/>
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
        brands:state.brandFilter.brands
    }

};

export default connect(mapStateToProps)(BrandFilter);