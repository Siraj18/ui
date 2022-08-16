
export enum UserActionsTypes {
    FETCH_USER = "FETCH_USER",
    FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
    FETCH_USER_ERROR = "FETCH_USER_ERROR",
}


interface FetchUserAction {
    type: UserActionsTypes.FETCH_USER

}
interface FetchUserSuccessAction {
    type: UserActionsTypes.FETCH_USER_SUCCESS,
    payload: any

}
interface FetchUserErrorAction {
    type: UserActionsTypes.FETCH_USER_ERROR,
    payload: string
}

export type UserAction = FetchUserAction | FetchUserSuccessAction | FetchUserErrorAction

export interface UserState {
    user: any
    loading: boolean,
    error: null | string
}
