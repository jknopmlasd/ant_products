
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { sendLogInToServer } from "../../actions/AuthAction";




const LogInForm =(props) =>{
    const [state , setState] = useState({
        user_name : "",
        password : "",
        error:""
        
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
        if(state.user_name && state.password){
            props.dispatch(sendLogInToServer(state));
        }
    
    } 
    
    if (props.isAuth) {
        return (
            <div className="container" style={{paddingTop: '6rem'}}>
    
            <h2>Sign In successes, you will be redirected to home page in 4 seconds</h2>
                </div>)
      }
    return(
      
      <div className="container" style={{paddingTop: '6rem'}}>
        
      <div className="card mt-2 hv-center row">
     <form onSubmit={handleSubmit} className="col-6">
        <input type="user_name" 
                       className="form-control" 
                       id="user_name"
                       name="user_name" 
                       placeholder="Enter user_name" 
                       value={state.user_name}
                       onChange={handleChange}
                />
        
         <input type="password" 
                        className="form-control" 
                        id="password" 
                        name="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
          <p>{props.error && props.error}</p>
          <button className="btn btn-primary btn-lg">Submit</button>
          
          

        </form>
        <Link to="/signup">Do not have an account? Sign up here.</Link>
        </div>
       </div>
   )
};
const mapStateToProps = (state) =>{
    return {
        isAuth: state.auth.isAuth,
        error:state.auth.error
    }
}

export default connect(mapStateToProps)(LogInForm);