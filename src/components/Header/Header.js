import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import { isAuth } from '../../actions/AuthAction';

const Header = (props) => {

    const {cartLength,user_name,isAuth} = props;

   const handleOut = (e) =>{
       //clear localStorage
       localStorage.removeItem("token");
       //dispatch(isAuth(0))
       props.dispatch(isAuth(0));

   }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <NavLink className="navbar-brand" to="/">Ecommerce</NavLink>
                <div>
                    <ul className="navbar-nav ml-auto">
                    

                    <li className="nav-item">
                        {isAuth ==1 
                        ? 
                        (
                        <NavLink className="nav-link" to={"/"} onClick={handleOut}>
                            <span className="mr-2">Welcome!!!{user_name}</span>
                        <i className="mr-2" aria-hidden="true" />
                        Log Out
                    </NavLink>)
                        :
                        (<NavLink className="nav-link" to={"/login"}>
                        <i className="mr-2" aria-hidden="true" />
                        Log In
                    </NavLink>)}
                            
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/cart"}>
                                <i className="fa fa-shopping-cart mr-2" aria-hidden="true" />
                                Cart {cartLength ? `(${cartLength})`: ''}
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};


const mapStateToProps = (state) => {
  return {
      cartLength: state.shop.cart.length,
      isAuth:state.auth.isAuth,
      user_name: state.auth.user_name
      
  }
};

export default connect(mapStateToProps, null)(Header);


/*
*                         <li className="nav-item active">
                            <a className="nav-link" href="#">Home
                                <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>
* */