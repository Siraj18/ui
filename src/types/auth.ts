
export enum AuthActionsTypes {
    LOGIN_USER = "LOGIN_USER",
    LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
    LOGIN_USER_ERROR = "LOGIN_USER_ERROR",
}

interface LoginUserAction {
    type: AuthActionsTypes.LOGIN_USER

}
interface LoginUserSuccessAction {
    type: AuthActionsTypes.LOGIN_USER_SUCCESS,
    payload: any

}
interface LoginUserErrorAction {
    type: AuthActionsTypes.LOGIN_USER_ERROR,
    payload: any
}

export type AuthAction = LoginUserAction | LoginUserSuccessAction | LoginUserErrorAction

export interface AuthState {
    isAuth: boolean
    loading: boolean,
    error: null | string
}