import { LOGIN_FAIL, LOGIN_SUCCESS, IS_AUTH,SIGNUP_FAIL,SIGNUP_SUCCESS} from "../actions/AuthAction";

export const  authReducer =(state ={},action) =>{
    switch (action.type) {
        case IS_AUTH:
            return {...state, isAuth: action.payload};
        case LOGIN_SUCCESS:
            return {...state, user_name:action.payload};
        case LOGIN_FAIL:
            return {...state, error:action.payload};
        case SIGNUP_SUCCESS:
            return {...state, user_name:action.payload};
        case SIGNUP_FAIL:
            return {...state, error:action.payload};
        
        default:
            return state;
}
}