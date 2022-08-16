import { CourseState, CourseAction, CourseActionsTypes } from './../../types/course';

const initialState: CourseState = {
    courses: [],
    loading: false,
    error: null,
}

export const courseReducer = (state = initialState, action: CourseAction): CourseState => {
    switch (action.type) {
        case CourseActionsTypes.FETCH_COURSE:
            return { loading: true, error: null, courses: [] };
        case CourseActionsTypes.FETCH_COURSE_SUCCESS:
            return { loading: false, error: null, courses: action.payload };
        case CourseActionsTypes.FETCH_COURSE_ERROR:
            return { loading: false, error: action.payload, courses: [] };
        default:
            return state;
    }
}

export default courseReducer;