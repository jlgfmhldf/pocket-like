import PocketLike from '../scripts/pocket-like-api'
import { REQUEST_ADD, API_KEY } from '../constants'

const api = new PocketLike(API_KEY)

const isPocket = window.location.href.indexOf('getpocket.com') != -1


const { pl_accessToken, pl_requestToken } = localStorage

const requestAdd = () => ({
	type: REQUEST_ADD,
})

const requestAuth = () => ({
	type: 'REQUEST_AUTH'
})

const requestRequest = () => ({
	type: 'REQUEST_REQUEST',
})

const error = () => ({
	type: 'ERROR',
})

export const getRequestToken = () => dispatch => {
	dispatch({ type: 'REQUEST_GET_REQUEST_TOKEN' })

	return api
		.request(location.href)
		.then(data => {
			console.info('getRequestToken', data)

			localStorage.pl_requestToken = data.code
			localStorage.pl_requestToken_is_authorized = false
		})
		.catch(() => {
			dispatch(error())
		})
}

export const getAccessToken = requestToken => dispatch => {
	return api
		.authorize(requestToken)
		.then(data => {
			console.info('getAccessToken', data)

			localStorage.pl_accessToken = data.access_token
		})
		.catch(() => {
			dispatch(error())
		})
}

export const authorization = ()  =>  {

	const { pl_accessToken, pl_requestToken } = localStorage

	return api.request(window.location.href)
		.then(data => {
			api.authorize(data.code)
		})
		.catch((err) => {
			console.log(err)
		})
}

const authorizeRedirect = (token) => {
	localStorage.pl_requestToken_is_authorized = true // TODO
	location.href = `
	https://getpocket.com/auth/authorize?
	request_token=${token}&
	redirect_uri=${window.location.href}`
}

const handleAuthorizeError = () => dispatch => {
	const {
		pl_accessToken,
		pl_requestToken,
		pl_IsAuthorizeToken,
		pl_requestToken_is_authorized,
	} = localStorage

	return new Promise((resolve) => {
		if(!pl_requestToken) {
			return dispatch(getRequestToken())
		}

		return resolve()
	})
	.then(() => {
		console.log('test2')
		if(pl_requestToken && pl_requestToken_is_authorized === 'false') {
			console.log('need redirect')
			return authorizeRedirect(pl_requestToken)
		}
	})
	.then(() => {
		console.log('test3')

		if(!pl_accessToken) {
			return dispatch(getAccessToken(pl_requestToken))
		}
	})
}

export const addOrAuthorizeAndAdd = () => dispatch => {
	const {
		pl_accessToken,
		pl_requestToken,
		pl_IsAuthorizeToken,
		pl_requestToken_is_authorized,
	} = localStorage

	const isIncompleteLs = !(
		pl_accessToken &&
		pl_requestToken &&
		pl_IsAuthorizeToken &&
		pl_requestToken_is_authorized
	)

	if (!isPocket) {

		if(!isIncompleteLs) {
			return api.add(pl_accessToken)

			//TODO обрабатывать ошибки из апи
		}

		return dispatch(handleAuthorizeError())
			.then(api.add(pl_accessToken))
	}
}

// TODO: написать для дебагга экшн сброса ls
