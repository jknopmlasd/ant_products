import React from 'react';
import {connect} from 'react-redux';
import {formatMoney} from "../../pipes/priceFormatter";
import {addProductToCart} from "../../actions";

const ProductDetail = (props) => {
    console.log(props);
    const {
        title,
        images,
        brand,
        price,
        cpu,
        camera,
        size,
        weight,
        display,
        battery,
        memory,
        description,
        id,
        detail
    } = props.product;


    const onCart = () => {
        props.dispatch(addProductToCart(props.product));
    };

    return (
        <aside className="col-sm-7">
            <article className="card-body p-5">
                <h3 className="title mb-3">{title}</h3>

                <p className="price-detail-wrap">
	<span className="price h3 text-warning">
		<span className="currency">$</span><span className="num">{formatMoney(price)}</span>
	</span>
                </p>
            
                 <br/><br/>
                <button
                    onClick={onCart}
                    className="btn btn-lg btn-outline-primary text-uppercase"><i
                    className="fa fa-shopping-cart"/> Add to cart11
                </button>
                <br/><br/>
                <div dangerouslySetInnerHTML={{__html: detail}} />
               
            </article>
        </aside>
    );
};

export default connect()(ProductDetail);
