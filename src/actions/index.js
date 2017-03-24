import storage from 'chrome-storage-wrapper'
import PocketLike from '../scripts/pocket-like-api'
import { REQUEST_ADD, API_KEY } from '../constants'

const api = new PocketLike(API_KEY)

const isPocket = window.location.href.indexOf('getpocket.com') != -1

const storageItems = [
	'accessToken',
	'requestToken',
	'requestTokenIsAuthorized',
]

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
			const requestToken = data.code

			return storage
				.set({
					requestToken,
					requestTokenIsAuthorized: false
				})
				.then(() => requestToken)
		})
		.catch(() => dispatch(error()))
}

export const getAccessToken = requestToken => dispatch => {
	return api
		.authorize(requestToken)
		.then(data => {
			const accessToken = data.access_token

			return storage
				.set({ accessToken })
				.then(() => accessToken)
		})
		.catch(() => dispatch(error()))
}

export const authorization = ()  =>  {

	return api.request(window.location.href)
		.then(data => {
			api.authorize(data.code)
		})
		.catch((err) => {
			console.log(err)
		})
}

const authorizeRedirect = (token) => {
	return storage
		.set({ requestTokenIsAuthorized: true })
		.then(() => {
			location.href = `https://getpocket.com/auth/authorize?
				request_token=${token}&
				redirect_uri=${window.location.href}`
		})
}

const handleAuthorizeError = () => dispatch => {

	return storage
		.get(storage)
		.then(([
			requestTokenIsAuthorized,
			requestToken,
		]) => {

			if (requestTokenIsAuthorized) {
				return dispatch(getAccessToken(requestToken))
			}

			return dispatch(getRequestToken())
				.then(requestToken => {
					console.log('redirect')
					return authorizeRedirect(requestToken)
						.then(() => requestToken)
				})
		})

}

export const addOrAuthorizeAndAdd = () => dispatch => {
	return storage
		.get(storageItems)
		.then(data => {
			const {
				accessToken,
				requestToken,
				requestTokenIsAuthorized,
			} = data

			const isValidStorage = requestToken && accessToken && requestTokenIsAuthorized !== undefined

			console.log(data)

			if (!isPocket) {

				if(isValidStorage && requestTokenIsAuthorized) {
					return api.add(accessToken)

					//TODO обрабатывать ошибки из апи
				}

				return storage
					.remove(storageItems)
					.then(() => {
						return dispatch(handleAuthorizeError()) //authorize
							.then(api.add(accessToken))
					})
			}
		})
}

// TODO: написать для дебагга экшн сброса ls
// TODO: remove all pl_
