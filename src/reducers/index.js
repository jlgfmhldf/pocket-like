const {
	pl_requestToken,
	pl_IsAuthorizeToken,
	pl_accessToken
} = localStorage

const initialState = {
	isFetching: false,
	isError: false,
	isAuthorized: false,
	needAuthorizeToken: false,
	requestToken: pl_requestToken || '',
	accessToken: pl_accessToken || '',
	isAuthorizedToken: pl_IsAuthorizeToken || '',
}

export default function(state = initialState,  { type, payload }) {
	switch (type) {

	case 'ERROR':
		return {
			...state,
			isError: true,
		}

	default:
		return state
	}
}
