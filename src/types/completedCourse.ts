
export enum CompletedCourseActionsTypes {
    FETCH_COMPLETED_COURSE = "FETCH_COMPLETED_COURSE",
    FETCH_COMPLETED_COURSE_SUCCESS = "FETCH_COMPLETED_COURSE_SUCCESS",
    FETCH_COMPLETED_COURSE_ERROR = "FETCH_COMPLETED_COURSE_ERROR",
}

interface FetchCompletedCourseAction {
    type: CompletedCourseActionsTypes.FETCH_COMPLETED_COURSE

}
interface FetchCompletedCourseSuccessAction {
    type: CompletedCourseActionsTypes.FETCH_COMPLETED_COURSE_SUCCESS,
    payload: any

}
interface FetchCompletedCourseErrorAction {
    type: CompletedCourseActionsTypes.FETCH_COMPLETED_COURSE_ERROR,
    payload: any
}

export type CompletedCourseAction = FetchCompletedCourseAction | FetchCompletedCourseSuccessAction | FetchCompletedCourseErrorAction

export interface CompletedCourseState {
    completedCourses: any
    loading: boolean,
    error: null | string
}