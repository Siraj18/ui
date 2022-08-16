import axios from 'axios';
import { Dispatch } from 'redux';
import api from '../../api/api';
import { UserAction, UserActionsTypes } from './../../types/user';

export const fetchUsers = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({ type: UserActionsTypes.FETCH_USER })
            const token = localStorage.getItem("token");

            const response = await api.get("users/me", { headers: { "Authorization": `Bearer ${token}` } });

            if (response.status !== 200) {
                dispatch({
                    type: UserActionsTypes.FETCH_USER_ERROR,
                    payload: response.data
                })
                return;
            }

            setTimeout(() => {
                dispatch({ type: UserActionsTypes.FETCH_USER_SUCCESS, payload: response.data })
            }, 1000)
        }
        catch (e) {

            dispatch({
                type: UserActionsTypes.FETCH_USER_ERROR,
                payload: "произошла ошибка при загрузке пользователя"
            })
        }
    }
}

