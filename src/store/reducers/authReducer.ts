import { AuthActionsTypes, AuthAction, AuthState } from './../../types/auth';

const initialState: AuthState = {
    isAuth: false,
    loading: false,
    error: null,
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionsTypes.LOGIN_USER:
            return { loading: true, error: null, isAuth: false };
        case AuthActionsTypes.LOGIN_USER_SUCCESS:
            return { loading: false, error: null, isAuth: action.payload };
        case AuthActionsTypes.LOGIN_USER_ERROR:
            return { loading: false, error: action.payload, isAuth: false };
        default:
            return state;
    }
}

export default authReducer;