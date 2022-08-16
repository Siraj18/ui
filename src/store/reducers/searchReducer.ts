import { SearchState, SearchAction, SearchActionsTypes } from './../../types/search';

const initialState: SearchState = {
    students: [],
    loading: false,
    error: null,
}

export const searchReducer = (state = initialState, action: SearchAction): SearchState => {
    switch (action.type) {
        case SearchActionsTypes.FETCH_SEARCH:
            return { loading: true, error: null, students: [] };
        case SearchActionsTypes.FETCH_SEARCH_SUCCESS:
            return { loading: false, error: null, students: action.payload };
        case SearchActionsTypes.FETCH_SEARCH_ERROR:
            return { loading: false, error: action.payload, students: [] };
        default:
            return state;
    }
}

export default searchReducer;