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

	localStorage.consumer_key = '56284-79593f636813881ec120103b';
	localStorage.redirect_uri = w.location.href


	const request = () =>
		api.ajax('oauth/request', {
			consumer_key: localStorage.consumer_key,
			redirect_uri: localStorage.redirect_uri
		})

	const authorize = (code) =>
		 api.ajax('oauth/authorize', {
			 consumer_key: localStorage.consumer_key,
			 code,
		 })

	const add = () => api.ajax('add', {
		title: 'Тест',
		url: w.location.href,
		consumer_key: localStorage.consumer_key,
		access_token: localStorage.pl_accessToken,
		// time: Date.now(),
	})

	console.log(localStorage)

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

							console.log('test authorize')
						})
				}
			}
		)
		.catch(console.error)

	console.warn('pocket-like test')

}

//TODO: промисы
//TODO: отрисовать иконку приложения
//Встроить в дом, рядом с иконкой feadly
//Подглядеть, как другие расширения обрабатывают ошибки.
// Как спрятать consumer_key
// поместить некоторые данные в chrome.storage
// https://learn.javascript.ru/fetch
// лучше открывать авторизацию в новом окне
