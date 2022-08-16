import { StatisticAction, StatisticActionsTypes } from './../../types/statistic';
import { StatisticState } from './../../types/statistic';

const initialState: StatisticState = {
    statistic: {},
    loading: false,
    error: null,
}

export const statisticReducer = (state = initialState, action: StatisticAction): StatisticState => {
    switch (action.type) {
        case StatisticActionsTypes.FETCH_STATISTIC:
            return { loading: true, error: null, statistic: {} };
        case StatisticActionsTypes.FETCH_STATISTIC_SUCCESS:
            return { loading: false, error: null, statistic: action.payload };
        case StatisticActionsTypes.FETCH_STATISTIC_ERROR:
            return { loading: false, error: action.payload, statistic: {} };
        default:
            return state;
    }
}

export default statisticReducer;