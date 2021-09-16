
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Joi from "joi";
import { sendLogInToServer } from "../../actions/AuthAction";





const LogInForm =(props) =>{
    const [state , setState] = useState({
        data:{user_name : "",password : ""},
        errors:""
        
    });
   const schema = {
    user_name: Joi.string() .email({
        tlds: { allow: false },
    })
    .required().label("Username"),
    password: Joi.string().required().label("Password")
  };
    useEffect(() => {
        //localStorage.removeItem("token");
        console.log("use effect",props);
        if(props.isAuth==1){
            console.log("will redirect");
         setTimeout(() => {
             console.log("will push");
             console.log(props.history);
              props.history.push('/products');
              }, 4000);
        
    }

      });
    const validateProperty=({name, value})=>{
        const obj ={[name]:value};
        const schemaPro = {[name]:schema[name]};
        const {error}= Joi.validate(obj, schemaPro);
        console.log("error",Joi.validate(obj, schemaPro));
        return error ? error.details[0].message:null;
    }

    const handleChange = (e) => {
        const errors = {...state.errors};
        const {name , value} = e.target;
        const errorMsg = validateProperty({name,value});
        if(errorMsg) {errors[name] = errorMsg;}
        else delete errors[name];
        const data={...state.data};
        data[name] =value;
        setState({data,errors});
    }
    const validate=()=>{
        const options = {abortEarly:false};
        const {error} = Joi.validate(state.data,schema, options);
        if(!error) return null;
        const errors ={};
        for(let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
       const errors = this.validate();
        this.setState({errors:errors||{}});
       if (errors) return;

        console.log("this state", state);
        if(state.data.user_name && state.data.password){
            props.dispatch(sendLogInToServer(state.data));
        }
    
    } 
    
    if (props.isAuth) {
        return (
            <div className="container" style={{paddingTop: '6rem'}}>
    
            <h2>Sign In success, you will be redirected to home page in 4 seconds</h2>
                </div>)
      }
    return(
      
      <div className="container" style={{paddingTop: '6rem'}}>
        
      <div className="card p-5 hv-center row">
     <form onSubmit={handleSubmit} className="col-sm-8 mx-auto">
         <div className="form-group">
             <label htrmFor="user_name">Username</label>
             <input type="text" 
                       className="form-control" 
                       id="user_name"
                       name="user_name" 
                       value={state.user_name}
                       onChange={handleChange}
                />
                <small className="text-small text-muted">{state.errors["user_name"]}</small>
         </div>
        
        <div className="form-group">
             <label htrmFor="password">Password</label>
             <input type="password" 
                        className="form-control" 
                        id="password" 
                        name="password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                    <small className="text-small text-muted">{state.errors["password"]}</small>
         </div>
         
          <p>{props.error && props.error}</p>
          <button type="btn" className="btn btn-primary btn-lg btn-block">Log In</button>
          
          

        </form>
        <Link to="/signup" className="text-center">Do not have an account? Sign up here.</Link>
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