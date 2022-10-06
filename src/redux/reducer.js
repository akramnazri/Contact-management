import { SET_CONTACT_ID,DELETE_CONTACT_ID } from "./actions";

const initialState = {
    id: ''
}

function userReducer(state=initialState, action){
    switch (action.type) {
        case SET_CONTACT_ID:
            return { ...state, id: [...state.id,action.payload]};
        case DELETE_CONTACT_ID:
            return { ...state, id:  state.id.filter((v)=> v !== action.payload)}
        default:
            return state;
    }

}

export default userReducer;