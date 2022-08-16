import { StudentAction, StudentActionsTypes } from './../../types/student';
import { StudentState } from "../../types/student";

const initialState: StudentState = {
    student: {},
    loading: false,
    error: null,
}

export const studentReducer = (state = initialState, action: StudentAction): StudentState => {
    switch (action.type) {
        case StudentActionsTypes.FETCH_STUDENT:
            return { loading: true, error: null, student: {} };
        case StudentActionsTypes.FETCH_STUDENT_SUCCESS:
            return { loading: false, error: null, student: action.payload };
        case StudentActionsTypes.FETCH_STUDENT_ERROR:
            return { loading: false, error: action.payload, student: {} };
        default:
            return state;
    }
}

export default studentReducer;