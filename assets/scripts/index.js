import ajax from './ajax'

console.log(ajax)

window.onload = function () {
	var
		api = {
			ajax: function ( path, data ) {
				const headers = new Headers({
					'Content-Type': 'application/json; charset=UTF8',
					'X-Accept': 'application/json'
				})

				const status = response => {
					if (response.status >= 200 && response.status < 300) {
						return Promise.resolve(response.json())
					} else {
						return Promise.reject(new Error(response.statusText))
					}
				}

				return fetch(`https://getpocket.com/v3/${path}`, {
					method: 'POST',
					body: JSON.stringify(data),
					headers
				}).then(status)
			}
		},
		w = window,
		isPocket = w.location.href.indexOf('getpocket.com') != -1;

	const consumerKey = '56284-79593f636813881ec120103b'
	const redirectURI = window.location.href

	const request = () =>
		api.ajax('oauth/request', {
			consumer_key: consumerKey,
			redirect_uri: redirectURI,
		})

	const authorize = (code) =>
		 api.ajax('oauth/authorize', {
			 consumer_key: consumerKey,
			 code,
		 })

	const add = () => api.ajax('add', {
		title: 'Тест',
		url: w.location.href,
		consumer_key: consumerKey,
		access_token: localStorage.pl_accessToken,
	})

	!isPocket && add()
		.then(
			response => {
				console.log('page added')
			},
			error => {
				if (!localStorage.pl_requestToken) {
					return request()
						.then(({ code }) => {

							localStorage.pl_requestToken = code

							if (!localStorage.pl_IsAuthorizeToken) {
								window.location.href = `https://getpocket.com/auth/authorize?request_token=${code}&redirect_uri=${w.location.href}`
								localStorage.pl_IsAuthorizeToken = 'true'
							}
						})
				}

				if (!localStorage.pl_accessToken) {

					return authorize(localStorage.pl_requestToken)
						.then(({ access_token, username })=> {
							localStorage.pl_accessToken = access_token
							localStorage.pl_username = username
						})
				}
			}
		)
		.catch(console.error)
}
