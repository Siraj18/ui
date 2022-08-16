
export enum LevelActionsTypes {
    FETCH_LEVEL = "FETCH_LEVEL",
    FETCH_LEVEL_SUCCESS = "FETCH_LEVEL_SUCCESS",
    FETCH_LEVEL_ERROR = "FETCH_LEVEL_ERROR",
}

interface FetchLevelAction {
    type: LevelActionsTypes.FETCH_LEVEL

}
interface FetchLevelSuccessAction {
    type: LevelActionsTypes.FETCH_LEVEL_SUCCESS,
    payload: any

}
interface FetchLevelErrorAction {
    type: LevelActionsTypes.FETCH_LEVEL_ERROR,
    payload: any
}

export type LevelAction = FetchLevelAction | FetchLevelSuccessAction | FetchLevelErrorAction

export interface LevelState {
    levels: any
    loading: boolean,
    error: null | string
}