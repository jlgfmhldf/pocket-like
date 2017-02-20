import { h, render } from 'preact'
// import { createStore } from 'redux'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'

import PocketLike from './scripts/pocket-like-api'
import App from './containers/App'

const store = configureStore()

const isPocket = window.location.href.indexOf('getpocket.com') != -1
const redirectURI = window.location.href

const pl = new PocketLike('56284-79593f636813881ec120103b')

const { pl_accessToken, pl_requestToken } = localStorage

const onButtonClick = () => {
	return !isPocket && pl.add(pl_accessToken)
		.then(
			() => {
				console.info('page added!')
			},
			() => {
				if (!pl_requestToken) {
					return pl
						.request(redirectURI)
						.then(({ code }) => {

							localStorage.pl_requestToken = code

							if (!localStorage.pl_IsAuthorizeToken) {
								window.location.href = `https://getpocket.com/auth/authorize?request_token=${code}&redirect_uri=${window.location.href}`
								localStorage.pl_IsAuthorizeToken = 'true'
							}
						})
				}

				if (!pl_accessToken) {
					return pl
						.authorize(pl_requestToken)
						.then(({ access_token, username }) => {
							localStorage.pl_accessToken = access_token
							localStorage.pl_username = username
						})
				}
			}
		)
		.catch(console.error)
}

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.body
)

console.log('pocket-like test49')

