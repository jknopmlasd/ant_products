
import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { sendSignUpToServer } from "../../actions/AuthAction";




const SignUpForm =(props) =>{
    const [state , setState] = useState({
        user_name : "",
        email:"",
        password : ""
    });
    useEffect(() => {
        console.log("use effect",props);
        if(props.isAuth==1){
            console.log("will redirect");
         setTimeout(() => {
              props.history.push('/products');
              }, 4000);
        
    }

      });

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("this state", state);
        if(state.user_name && state.password && state.email) {
            props.dispatch(sendSignUpToServer(state));
        }
    
    } 
    if(props.isAuth==1){
        return (
            <div className="container" style={{paddingTop: '6rem'}}>
    
            <h2>You are registered, you will be redirected to home page in 4 seconds</h2>
                </div>)
    
    
       
    }

   
    return(
      
    
        <div className="container" style={{paddingTop: '6rem'}}>
      <div className="card p-5 hv-center row">
       <form onSubmit={handleSubmit} className="col-sm-8 mx-auto">
        <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="user_name" 
                       className="form-control" 
                       id="user_name" 
                       name="user_name"
                       placeholder="Enter user_name" 
                       value={state.user_name}
                       onChange={handleChange}
                       required
                />
        </div>
         
        <div className="form-group">
            <label htmlFor="email">Email</label>
        </div>
             <input type="email" 
                       className="form-control" 
                       id="email" 
                       name="email"
                       placeholder="Enter email" 
                       value={state.email}
                       onChange={handleChange}
                       required
                />
        <div classname="form-group">
            <label htmlFor="passsword">Password</label>
            <input type="password" 
                        className="form-control" 
                        id="password" 
                        name="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                        required
                    />
        </div>
         
          <button type="btn" className="btn btn-primary btn-lg btn-block">Sign Up</button>
        </form>
        </div>
        </div>
     
   )
};
const mapStateToProps = (state) =>{
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps)(SignUpForm);