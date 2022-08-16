
export enum StatisticActionsTypes {
    FETCH_STATISTIC = "FETCH_STATISTIC",
    FETCH_STATISTIC_SUCCESS = "FETCH_STATISTIC_SUCCESS",
    FETCH_STATISTIC_ERROR = "FETCH_STATISTIC_ERROR",
}


interface FetchStatisticAction {
    type: StatisticActionsTypes.FETCH_STATISTIC

}
interface FetchStatisticSuccessAction {
    type: StatisticActionsTypes.FETCH_STATISTIC_SUCCESS,
    payload: any

}
interface FetchStatisticErrorAction {
    type: StatisticActionsTypes.FETCH_STATISTIC_ERROR,
    payload: string
}

export type StatisticAction = FetchStatisticAction | FetchStatisticSuccessAction | FetchStatisticErrorAction

export interface StatisticState {
    statistic: any
    loading: boolean,
    error: null | string
}
