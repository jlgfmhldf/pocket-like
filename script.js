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
		isGetPocket = w.location.href.indexOf('getpocket.com') != -1,
		isSavePage = w.location.href.indexOf('learn.javascript.ru/attributes-and-custom-properties') != -1

	localStorage.consumer_key = '56284-79593f636813881ec120103b';
	localStorage.redirect_uri = w.location.href


	const request = () =>
		api.ajax('oauth/request', {
			consumer_key: localStorage.consumer_key,
			redirect_uri: localStorage.redirect_uri
		})


	const callbackRequest = res => {
		window.location.href = `https://getpocket.com/auth/authorize?request_token=${localStorage.request_token}&redirect_uri=${localStorage.redirect_uri}`
	}

	 const authorize = () =>
			 api.ajax('oauth/authorize', {
				 consumer_key: localStorage.consumer_key,
				 code: localStorage.request_token
			 })

	 const add = () => api.ajax('add', {
		 title: 'Тест',
		 url: `http://learn.javascript.ru/attributes-and-custom-properties`,
		 consumer_key: localStorage.consumer_key,
		 access_token: localStorage.access_token,
		 time: Date.now(),
	 })

	!isGetPocket && add()
		.then(
			response => {
				console.log('page added')
			},
			error => {
				authorize()
					.then(
						response => {
							localStorage.isAuthorized = 'true'
							return Promise.reject()
						},
						request()
							.then(
								response => {
									localStorage.isRequested = 'true';
									localStorage.request_token = response.code;
									callbackRequest(response)
								})
					)

			}
		)

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
