const { pl_requestToken, pl_IsAuthorizeToken } = localStorage

const initialState = {
	isFetching: false,
	isError: false,
	isAuthorized: false,
	needAuthorizeToken: false,
	requestToken: pl_requestToken || '',
	authorizeToken: pl_IsAuthorizeToken || '',
}

export default function(state = initialState) {
	switch (state) {

	default:
		return state
	}
}
