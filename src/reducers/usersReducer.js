import { FETCH_USERS, FETCH_USER} from "../actions/types";

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_USERS:
			console.log("fetching user reducer" , action.payload)
            return (action.payload);
		case FETCH_USER:
			return action.payload;
		default:
			return state;
	}
}