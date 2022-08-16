import { Dispatch } from 'redux';
import api from '../../api/api';
import { AuthAction, AuthActionsTypes } from '../../types/auth';


export const loginUser = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            console.log("в auth")

            dispatch({ type: AuthActionsTypes.LOGIN_USER })
            const token = localStorage.getItem("token");

            if (token == "") {
                dispatch({
                    type: AuthActionsTypes.LOGIN_USER_ERROR,
                    payload: false
                })
                return;
            }

            const response = await api.get("users/me", { headers: { "Authorization": `Bearer ${token}` } });

            if (response.status !== 200) {
                dispatch({
                    type: AuthActionsTypes.LOGIN_USER_ERROR,
                    payload: false
                })
                return;
            }

            setTimeout(() => {
                dispatch({ type: AuthActionsTypes.LOGIN_USER_SUCCESS, payload: true })
            }, 1000)
        }
        catch (e) {

            dispatch({
                type: AuthActionsTypes.LOGIN_USER_ERROR,
                payload: "произошла ошибка при логине пользователя"
            })
        }
    }
}

