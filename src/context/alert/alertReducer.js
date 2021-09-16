import { SET_ALERT, REMOVE_ALERT} from '../types'

const AlertReducer = (state, action) => {
    switch(action.type) {
        case SET_ALERT:
            // return the current state and hence the spread operator.
            return action.payload
        case REMOVE_ALERT:
            return null;
        default:
            return state;
    }
}
export default AlertReducer;