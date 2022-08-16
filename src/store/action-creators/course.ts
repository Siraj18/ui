import { CourseAction, CourseActionsTypes } from './../../types/course';
import { Dispatch } from 'redux';
import api from '../../api/api';

export const fetchCourses = () => {
    return async (dispatch: Dispatch<CourseAction>) => {
        try {
            dispatch({ type: CourseActionsTypes.FETCH_COURSE })
            const token = localStorage.getItem("token");

            const response = await api.get("Courses/all", { headers: { "Authorization": `Bearer ${token}` } });

            if (response.status !== 200) {
                dispatch({
                    type: CourseActionsTypes.FETCH_COURSE_ERROR,
                    payload: response.data
                })
                return;
            }

            setTimeout(() => {
                dispatch({ type: CourseActionsTypes.FETCH_COURSE_SUCCESS, payload: response.data })
            }, 1000)
        }
        catch (e) {

            dispatch({
                type: CourseActionsTypes.FETCH_COURSE_ERROR,
                payload: "произошла ошибка при загрузке курсов"
            })
        }
    }
}

