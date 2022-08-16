import { LevelAction, LevelActionsTypes } from './../../types/level';
import { Dispatch } from 'redux';
import api from '../../api/api';

export const fetchLevelsByCourseId = (courseId: any) => {
    return async (dispatch: Dispatch<LevelAction>) => {
        try {
            dispatch({ type: LevelActionsTypes.FETCH_LEVEL })
            const token = localStorage.getItem("token");

            const response = await api.get("levels/byCourseId?id=" + courseId, { headers: { "Authorization": `Bearer ${token}` } });

            if (response.status !== 200) {
                dispatch({
                    type: LevelActionsTypes.FETCH_LEVEL_ERROR,
                    payload: response.data
                })
                return;
            }

            setTimeout(() => {
                dispatch({ type: LevelActionsTypes.FETCH_LEVEL_SUCCESS, payload: response.data })
            }, 1000)
        }
        catch (e) {

            dispatch({
                type: LevelActionsTypes.FETCH_LEVEL_ERROR,
                payload: "произошла ошибка при загрузке уровней"
            })
        }
    }
}

