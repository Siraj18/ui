import { Dispatch } from 'redux';
import api from '../../api/api';
import { CompletedCourseAction, CompletedCourseActionsTypes } from '../../types/completedCourse';

export const fetchCompletedCourses = (userId: string) => {
    return async (dispatch: Dispatch<CompletedCourseAction>) => {
        try {
            dispatch({ type: CompletedCourseActionsTypes.FETCH_COMPLETED_COURSE })
            const token = localStorage.getItem("token");

            const response = await api.get("statistics/allCompleteCourses?userId=" + userId, { headers: { "Authorization": `Bearer ${token}` } });

            if (response.status !== 200) {
                dispatch({
                    type: CompletedCourseActionsTypes.FETCH_COMPLETED_COURSE_ERROR,
                    payload: response.data
                })
                return;
            }

            setTimeout(() => {
                dispatch({ type: CompletedCourseActionsTypes.FETCH_COMPLETED_COURSE_SUCCESS, payload: response.data })
            }, 1000)
        }
        catch (e) {

            dispatch({
                type: CompletedCourseActionsTypes.FETCH_COMPLETED_COURSE_ERROR,
                payload: "произошла ошибка при загрузке завершенных курсов"
            })
        }
    }
}

