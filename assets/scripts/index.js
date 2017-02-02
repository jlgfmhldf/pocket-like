import PocketLike from './pocket-like-api'

window.onload = function () {
	var w = window,
		isPocket = w.location.href.indexOf('getpocket.com') != -1;
	const redirectURI = window.location.href

	const pl = new PocketLike('56284-79593f636813881ec120103b')

	!isPocket && pl.add(localStorage.pl_accessToken)
		.then(
			() => {
				console.info('page added!')
			},
			() => {
				if (!localStorage.pl_requestToken) {
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

				if (!localStorage.pl_accessToken) {
					return pl
						.authorize(localStorage.pl_requestToken)
						.then(({ access_token, username }) => {
							localStorage.pl_accessToken = access_token
							localStorage.pl_username = username
						})
				}
			}
		)
		.catch(console.error)
}
