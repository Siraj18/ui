import { StatisticActionsTypes } from './../../types/statistic';
import { StatisticAction } from './../../types/statistic';
import { Dispatch } from 'redux';
import api from '../../api/api';

export const fetchStatistic = (userId: string) => {
    return async (dispatch: Dispatch<StatisticAction>) => {
        try {
            dispatch({ type: StatisticActionsTypes.FETCH_STATISTIC })
            const token = localStorage.getItem("token");

            const response = await api.get("Statistics/" + userId, { headers: { "Authorization": `Bearer ${token}` } });

            if (response.status !== 200) {
                dispatch({
                    type: StatisticActionsTypes.FETCH_STATISTIC_ERROR,
                    payload: response.data
                })
                return;
            }

            setTimeout(() => {
                dispatch({ type: StatisticActionsTypes.FETCH_STATISTIC_SUCCESS, payload: response.data })
            }, 1000)
        }
        catch (e) {

            dispatch({
                type: StatisticActionsTypes.FETCH_STATISTIC_ERROR,
                payload: "произошла ошибка при загрузке статистики ученика"
            })
        }
    }
}

