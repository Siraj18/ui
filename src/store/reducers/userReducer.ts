import { UserAction, UserActionsTypes, UserState } from "../../types/user";

const initialState: UserState = {
    user: {},
    loading: false,
    error: null,
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionsTypes.FETCH_USER:
            return { loading: true, error: null, user: {} };
        case UserActionsTypes.FETCH_USER_SUCCESS:
            return { loading: false, error: null, user: action.payload };
        case UserActionsTypes.FETCH_USER_ERROR:
            return { loading: false, error: action.payload, user: {} };
        default:
            return state;
    }
}

export default userReducer;