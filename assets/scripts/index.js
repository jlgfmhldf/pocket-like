import PocketLike from './pocket-like-api'
import debounce from 'debounce'

window.onload = function () {
	var w = window,
		isPocket = w.location.href.indexOf('getpocket.com') != -1;
	const redirectURI = window.location.href

	const pl = new PocketLike('56284-79593f636813881ec120103b')

	const { pl_accessToken, pl_requestToken } = localStorage

	const onButtonClick = debounce(() => {
		console.log('start add')

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
									window.location.href = `https://getpocket.com/auth/authorize?request_token=${code}&redirect_uri=${w.location.href}`
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
	}, 10000, true)


	const button = window.document.createElement('div')
	button.className = 'pocketLike'
	button.style.backgroundImage = `url(${chrome.extension.getURL('assets/icons/icon.png')})`

	window.document.body.appendChild(button)

	button.addEventListener('click', () => {
		onButtonClick()
	})

	console.log('pocket-like')
}
