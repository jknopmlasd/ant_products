import axios from "axios";
export const SEND_LOGIN_TO_SERVER = "SEND_LOGIN_TO_SERVER";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const IS_AUTH = "IS_AUTH";
export const SIGNUP_FAIL = "SIGNUP_FAIL";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";


const BASE_URL ="http://awaka.online/react/post.php";

export const sendLogInToServer = (userData) =>{
    return (dispatch)=>{
        


        let url=BASE_URL;

    if(userData){
      userData.action="login";
      const params=Object.entries(userData).map(([key, val]) => `${key}=${val}`).join('&')
      url+="?"+params;
    }
     console.log("userData in authAction",userData);
    userData.action="login";
   

     
    axios({
        method: 'post',
        url: url
      }).then(res=>{
            console.log("res from Auth login", res);
            dispatch(isAuth(0));
            if(res.data["error"] == 1){
                dispatch(logInFail(res.data.msg));
                dispatch(isAuth(0));
            }else{
                dispatch(LogInSuccess(res.data.user_name));
                localStorage.setItem('token',JSON.stringify(res.data.token));
                dispatch(isAuth(1));
                //redirect
                
               

            }
            
     
    }).catch(error=>{
        console.log(error);
       
        dispatch(isAuth(1));

    });
    


}
}
export const isAuth=(x)=>{
    return {
        type: IS_AUTH,
        payload:x
    }

}
export const logInFail=(error)=>{
    return {
        type: LOGIN_FAIL,
        payload:error
    }

}
export const LogInSuccess=(user_name)=>{
    return {
        type: LOGIN_SUCCESS,
        payload:user_name
    }

}
//SIGN UP
export const sendSignUpToServer = (signupData) =>{
    return (dispatch)=>{
        let url=BASE_URL;

    if(signupData){
        signupData.action="signup";
      const params=Object.entries(signupData).map(([key, val]) => `${key}=${val}`).join('&')
      url+="?"+params;
    }
     console.log("userData in authAction",signupData);
     signupData.action="signup";
   

     
    axios({
        method: 'post',
        url: url
      }).then(res=>{
            console.log("res from Auth login", res);
            dispatch(isAuth(0));
            if(res.data["error"] == 1){
                dispatch(signUpFail(res.data.msg));
                dispatch(isAuth(0));
            }else{
                dispatch(signUpSuccess(res.data.user_name));
                localStorage.setItem('token',JSON.stringify(res.data.token));
                dispatch(isAuth(1));
                //redirect
                
               

            }
            
     
    }).catch(error=>{
        console.log(error);
        
        dispatch(isAuth(1));

    });
    


}
}
export const signUpFail=(msg)=>{
    return {
        type: SIGNUP_FAIL,
        payload:msg
    }

}
export const signUpSuccess=(user_name)=>{
    return {
        type: SIGNUP_SUCCESS,
        payload:user_name
    }

}
