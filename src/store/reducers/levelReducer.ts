import { LevelState, LevelActionsTypes, LevelAction } from './../../types/level';

const initialState: LevelState = {
    levels: [],
    loading: false,
    error: null,
}

export const levelReducer = (state = initialState, action: LevelAction): LevelState => {
    switch (action.type) {
        case LevelActionsTypes.FETCH_LEVEL:
            return { loading: true, error: null, levels: [] };
        case LevelActionsTypes.FETCH_LEVEL_SUCCESS:
            return { loading: false, error: null, levels: action.payload };
        case LevelActionsTypes.FETCH_LEVEL_ERROR:
            return { loading: false, error: action.payload, levels: [] };
        default:
            return state;
    }
}

export default levelReducer;