
export enum CounterActionsTypes {
    FETCH_COUNTER = "FETCH_COUNTER",
    FETCH_COUNTER_SUCCESS = "FETCH_COUNTER_SUCCESS",
    FETCH_COUNTER_ERROR = "FETCH_COUNTER_ERROR",
}

interface FetchCounterAction {
    type: CounterActionsTypes.FETCH_COUNTER

}
interface FetchCounterSuccessAction {
    type: CounterActionsTypes.FETCH_COUNTER_SUCCESS,
    payload: any

}
interface FetchCounterErrorAction {
    type: CounterActionsTypes.FETCH_COUNTER_ERROR,
    payload: any
}

export type CounterAction = FetchCounterAction | FetchCounterSuccessAction | FetchCounterErrorAction

export interface CounterState {
    counter: any
    loading: boolean,
    error: null | string
}