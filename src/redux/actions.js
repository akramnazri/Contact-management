export const SET_CONTACT_ID = 'SET_CONTACT_ID';
export const DELETE_CONTACT_ID = 'DELETE_CONTACT_ID';


export const setId = id => dispatch => {
    dispatch({
        type: SET_CONTACT_ID,
        payload: id
    });
}

export const deleteId = id => dispatch => {
    dispatch({
        type: DELETE_CONTACT_ID,
        payload: id
    });
}