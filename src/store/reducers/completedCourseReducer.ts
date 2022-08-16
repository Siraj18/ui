import { CompletedCourseAction, CompletedCourseActionsTypes, CompletedCourseState } from './../../types/completedCourse';

const initialState: CompletedCourseState = {
    completedCourses: [],
    loading: false,
    error: null,
}

export const completedCourseReducer = (state = initialState, action: CompletedCourseAction): CompletedCourseState => {
    switch (action.type) {
        case CompletedCourseActionsTypes.FETCH_COMPLETED_COURSE:
            return { loading: true, error: null, completedCourses: [] };
        case CompletedCourseActionsTypes.FETCH_COMPLETED_COURSE_SUCCESS:
            return { loading: false, error: null, completedCourses: action.payload };
        case CompletedCourseActionsTypes.FETCH_COMPLETED_COURSE_ERROR:
            return { loading: false, error: action.payload, completedCourses: [] };
        default:
            return state;
    }
}

export default completedCourseReducer;