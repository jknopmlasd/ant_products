import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {createStore ,applyMiddleware,compose} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import './App.scss';
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ShoppingCart from "./pages/ShopingCart/ShoppingCart";
import LogInForm from './components/Auth/LogInForm';
import SignUpForm  from './components/Auth/SignUpForm';
import NotFound from "./pages/Other/NotFound";


export const  store = createStore(rootReducer, compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

class App extends Component {
   
    
  render() {
    console.log("store in App", store);
    const st=store.getState();
    console.log("st is", st);
    return (
        
        
        <Provider store={store}>
             
            <BrowserRouter>
            <React.Fragment>
                <Header/>
                <Switch>
                    <Route exact path={'/'} render={() => {
                        return <Redirect to={'/products'}/>
                    }}/>

                    <Route exact path={'/products'}
                      render={props=>{
                          //if(st.auth.isAuth==0) return<Redirect to="/login" />
                          return <Home {...props}/>
                      }}
                     />

                    <Route exact path={'/product/:id(\\d+)'} component={ProductDetail}/>
                    <Route exact path={'/cart'} component={ShoppingCart}/>
                    <Route exact path={'/login'} component={LogInForm}/>
                    <Route exact path={'/signup'} component={SignUpForm}/>
                    <Route component={NotFound} />
                </Switch>
                <Footer/>
            </React.Fragment>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
