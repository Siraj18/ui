import { CounterAction, CounterActionsTypes } from './../../types/counter';
import { Dispatch } from 'redux';
import api from '../../api/api';

export const fetchCounterByCourseIdAndStatisticId = (courseId: any, statisticId: any) => {
    return async (dispatch: Dispatch<CounterAction>) => {
        try {
            dispatch({ type: CounterActionsTypes.FETCH_COUNTER })
            const token = localStorage.getItem("token");

            const response = await api.get("courses/maxLevel?statisticId=" + statisticId + "&courseId=" + courseId, { headers: { "Authorization": `Bearer ${token}` } });

            if (response.status !== 200) {
                dispatch({
                    type: CounterActionsTypes.FETCH_COUNTER_ERROR,
                    payload: response.data
                })
                return;
            }

            setTimeout(() => {
                dispatch({ type: CounterActionsTypes.FETCH_COUNTER_SUCCESS, payload: response.data })
            }, 1000)
        }
        catch (e) {

            dispatch({
                type: CounterActionsTypes.FETCH_COUNTER_ERROR,
                payload: "произошла ошибка при загрузке каунтера"
            })
        }
    }
}

