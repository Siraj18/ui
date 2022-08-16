
export enum CourseActionsTypes {
    FETCH_COURSE = "FETCH_COURSE",
    FETCH_COURSE_SUCCESS = "FETCH_COURSE_SUCCESS",
    FETCH_COURSE_ERROR = "FETCH_COURSE_ERROR",
}

interface FetchCourseAction {
    type: CourseActionsTypes.FETCH_COURSE

}
interface FetchCourseSuccessAction {
    type: CourseActionsTypes.FETCH_COURSE_SUCCESS,
    payload: any

}
interface FetchCourseErrorAction {
    type: CourseActionsTypes.FETCH_COURSE_ERROR,
    payload: any
}

export type CourseAction = FetchCourseAction | FetchCourseSuccessAction | FetchCourseErrorAction

export interface CourseState {
    courses: any
    loading: boolean,
    error: null | string
}