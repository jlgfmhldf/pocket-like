const {
	pl_requestToken,
	pl_IsAuthorizeToken,
	pl_accessToken
} = localStorage

const initialState = {
	isAuthorized: false,
	requestToken: pl_requestToken || '',
	accessToken: pl_accessToken || '',
	isAuthorizedToken: pl_IsAuthorizeToken || '',
}

export default function auth(state=initialState,action){
    switch(action.type){
        case 'SET_REQUEST_TOKEN' : 
            return {
                ...state,
                requestToken: action.payload,
                isAuthorizedToken: 'true'
            }
        case 'SET_ACCESS_TOKEN' : 
            return {
                ...state,
                accessToken: action.payload,
                isAuthorized : true
            }
        default :
            return state;
    }
}