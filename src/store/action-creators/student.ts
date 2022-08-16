import { StudentAction, StudentActionsTypes } from './../../types/student';
import axios from 'axios';
import { Dispatch } from 'redux';
import api from '../../api/api';
import { UserAction, UserActionsTypes } from '../../types/user';

export const fetchStudent = (id: string) => {
    return async (dispatch: Dispatch<StudentAction>) => {
        try {
            dispatch({ type: StudentActionsTypes.FETCH_STUDENT })
            const token = localStorage.getItem("token");

            const response = await api.get("users/getUserById/" + id, { headers: { "Authorization": `Bearer ${token}` } });

            if (response.status !== 200) {
                dispatch({
                    type: StudentActionsTypes.FETCH_STUDENT_ERROR,
                    payload: response.data
                })
                return;
            }

            setTimeout(() => {
                dispatch({ type: StudentActionsTypes.FETCH_STUDENT_SUCCESS, payload: response.data })
            }, 1000)
        }
        catch (e) {

            dispatch({
                type: StudentActionsTypes.FETCH_STUDENT_ERROR,
                payload: "произошла ошибка при загрузке ученика"
            })
        }
    }
}

