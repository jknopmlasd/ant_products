
import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
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
            <div className="container-lg" style={{paddingTop: '6rem'}}>
              <div classname="row p-5 m5">
               <h2>You are registered, you will be redirected to home page in 4 seconds</h2>
            </div> 
                </div>)
    
    
       
    }

   
    return(
      
    
        <div className="container-lg" style={{paddingTop: '6rem'}}>
          <div className="text-center">
              <i className="bi bi-person-circle"></i>
              <h2 classname="display-2">Sign Up</h2>
          </div>
          <div className="row justify-content-center align-items-center">
           <form onSubmit={handleSubmit} className="col-lg-6">
            <div className="form-group my-1">
             <label htmlFor="username">Username</label>
             <input type="user_name" 
                       className="form-control" 
                       id="user_name" 
                       name="user_name"
                       value={state.user_name}
                       onChange={handleChange}
                       required
                />
        </div>
         
        <div className="form-group my-1">
            <label htmlFor="email">Email</label>
        
             <input type="email" 
                       className="form-control" 
                       id="email" 
                       name="email" 
                       value={state.email}
                       onChange={handleChange}
                       required
                />
        </div>
        <div classname="form-group my-1">
            <label htmlFor="passsword">Password</label>
            <input type="password" 
                        className="form-control" 
                        id="password" 
                        name="password"
                        value={state.password}
                        onChange={handleChange} 
                        required
                    />
        </div>
         
          <button type="btn" className="btn btn-success btn-lg col-12 my-2">Sign Up</button>
        </form>
        <Link to="/login" className="text-center my-5">Already have an account? Log In here.</Link>
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