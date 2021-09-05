import React, {Component} from 'react';
import BrandFilter from "../../components/BrandFilter/BrandFilter";
import OrderFilter from "../../components/OrderFilter/OrderFilter";

class FilterBar extends Component {
    render() {
        return (
            <div className="col-lg-12">
                <div className="card p-2 mb-2">
                    <div className="col-12 d-flex">
                        <BrandFilter/>
                    </div>
                    <div className="col-12 d-flex">
                        <OrderFilter/>
                    </div>
                </div>
            </div>
        );
    }
}

export default FilterBar;