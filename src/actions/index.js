import PocketLike from '../scripts/pocket-like-api'
import { REQUEST_ADD, API_KEY } from '../constants'

const api = new PocketLike(API_KEY)

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

export const add = () => (dispatch) => {

	dispatch(requestAdd())

	return api.add(pl_accessToken)
		.then(() => {
			console.log('success')
		})
		.catch((err) => {
			const { status } = err

			if (status === 401) {
				dispatch(requestAuth())

				authorization()
			}
		})
}
