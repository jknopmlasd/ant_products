import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {createStore ,applyMiddleware,compose} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import './App.scss';
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ShoppingCart from "./pages/ShopingCart/ShoppingCart";



export const  store = createStore(rootReducer, compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

class App extends Component {
   
    
  render() {
    return (
        

        <Provider store={store}>
            <BrowserRouter>
            <React.Fragment>
                <Header/>
                <Switch>
                    <Route exact path={'/'} render={() => {
                        return <Redirect to={'/products'}/>
                    }}/>
                    <Route exact path={'/products'} component={Home} />
                    <Route exact path={'/products/:id'} component={ProductDetail}/>
                    <Route exact patr={'/cart'} component={ShoppingCart}/>
                </Switch>
                <Footer/>
            </React.Fragment>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
