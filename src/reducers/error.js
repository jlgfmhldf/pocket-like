const initialState = {
    type: 'ERORR',
    msg: '',
    isThrown: false
}
export default function article(state=initialState,action){
    switch(action.type){
        case 'THROW_CURRENT_ERROR' : 
            return {
                ...state,
                isThrown: true,
            }
        default :
            return state;
    }
}