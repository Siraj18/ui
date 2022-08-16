
export enum SearchActionsTypes {
    FETCH_SEARCH = "FETCH_SEARCH",
    FETCH_SEARCH_SUCCESS = "FETCH_SEARCH_SUCCESS",
    FETCH_SEARCH_ERROR = "FETCH_SEARCH_ERROR",
}


interface FetchSearchAction {
    type: SearchActionsTypes.FETCH_SEARCH

}
interface FetchSearchSuccessAction {
    type: SearchActionsTypes.FETCH_SEARCH_SUCCESS,
    payload: any

}
interface FetchSearchErrorAction {
    type: SearchActionsTypes.FETCH_SEARCH_ERROR,
    payload: string
}

export type SearchAction = FetchSearchAction | FetchSearchSuccessAction | FetchSearchErrorAction

export interface SearchState {
    students: any
    loading: boolean,
    error: null | string
}
