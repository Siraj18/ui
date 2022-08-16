import { CounterAction, CounterActionsTypes } from './../../types/counter';
import { CounterState } from '../../types/counter';

const initialState: CounterState = {
    counter: 0,
    loading: false,
    error: null,
}

export const counterReducer = (state = initialState, action: CounterAction): CounterState => {
    switch (action.type) {
        case CounterActionsTypes.FETCH_COUNTER:
            return { loading: true, error: null, counter: 0 };
        case CounterActionsTypes.FETCH_COUNTER_SUCCESS:
            return { loading: false, error: null, counter: action.payload };
        case CounterActionsTypes.FETCH_COUNTER_ERROR:
            return { loading: false, error: action.payload, counter: 0 };
        default:
            return state;
    }
}

export default counterReducer;