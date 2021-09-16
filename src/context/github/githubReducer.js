import { 
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types'

const GitHubReducer = (state, action) => {
    switch(action.type) {
        case SEARCH_USERS:
            // return the current state and hence the spread operator.
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case CLEAR_USERS:
            return {
                ...state,
                users: [],
                loading: false
            }
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                loading: false
            }
        case SET_LOADING:
            // state is immutable so we can't change; hence we return a copy of state.
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export default GitHubReducer;
