
export enum StudentActionsTypes {
    FETCH_STUDENT = "FETCH_STUDENT",
    FETCH_STUDENT_SUCCESS = "FETCH_STUDENT_SUCCESS",
    FETCH_STUDENT_ERROR = "FETCH_STUDENT_ERROR",
}


interface FetchStudentAction {
    type: StudentActionsTypes.FETCH_STUDENT

}
interface FetchStudentSuccessAction {
    type: StudentActionsTypes.FETCH_STUDENT_SUCCESS,
    payload: any

}
interface FetchStudentErrorAction {
    type: StudentActionsTypes.FETCH_STUDENT_ERROR,
    payload: string
}

export type StudentAction = FetchStudentAction | FetchStudentSuccessAction | FetchStudentErrorAction

export interface StudentState {
    student: any
    loading: boolean,
    error: null | string
}
