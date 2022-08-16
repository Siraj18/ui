import { SearchAction, SearchActionsTypes } from './../../types/search';
import { Dispatch } from 'redux';
import api from '../../api/api';

export const searchStudents = (value: string, type: boolean) => {
    return async (dispatch: Dispatch<SearchAction>) => {
        try {
            dispatch({ type: SearchActionsTypes.FETCH_SEARCH })
            const token = localStorage.getItem("token");

            let response: any = null;

            if (type) {
                response = await api.get("users/getUsersByUserClass/" + value, { headers: { "Authorization": `Bearer ${token}` } });
            } else {
                response = await api.get("users/getUsersByName/" + value, { headers: { "Authorization": `Bearer ${token}` } });
            }


            if (response.status !== 200) {
                dispatch({
                    type: SearchActionsTypes.FETCH_SEARCH_ERROR,
                    payload: response.data
                })
                return;
            }

            setTimeout(() => {
                dispatch({ type: SearchActionsTypes.FETCH_SEARCH_SUCCESS, payload: response.data })
            }, 1000)
        }
        catch (e: any) {
            if (e.response) {
                dispatch({
                    type: SearchActionsTypes.FETCH_SEARCH_ERROR,
                    payload: e.response.data
                })
            } else {
                dispatch({
                    type: SearchActionsTypes.FETCH_SEARCH_ERROR,
                    payload: "произошла ошибка при загрузке списка учеников"
                })
            }

        }
    }
}

