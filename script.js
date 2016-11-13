window.onload = function () {
	var
		api = {
			ajax: function ( path, data ) {
//				const xhr = new XMLHttpRequest()

				const headers = new Headers({
					'Content-Type': 'application/json; charset=UTF8',
					'X-Accept': 'application/json'
				})

				const promise =  fetch(`https://getpocket.com/v3/${path}`, {
					method: 'POST',
					body: JSON.stringify(data),
					headers
				})

				console.log(promise)

				return promise

//				xhr.open('POST', `https://getpocket.com/v3/${path}`, true);
//				xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF8');
//				xhr.setRequestHeader('X-Accept', 'application/json');
//				xhr.send(JSON.stringify(data));
//
//				xhr.onreadystatechange = function() {
//
//					console.log(xhr)
//
//					if (xhr.readyState === 4) {
//						if ( xhr.status === 200) {
//
//							load(JSON.parse(xhr.response))
//
//						} else {
//							console.log("error " + this.status);
//
//							error(xhr.statusText)
//
//							return new Error();
//						}
//					}
//				}
			}
		},
		w = window,
		isGetPocket = w.location.href.indexOf('getpocket.com') != -1

	localStorage.consumer_key = '56284-79593f636813881ec120103b';
	localStorage.redirect_uri = w.location.href

	function status(response) {
		if (response.status >= 200 && response.status < 300) {
			return Promise.resolve(response)
		} else {
			return Promise.reject(new Error(response.statusText))
		}
	}


//	const request = () => {
//		api.ajax('oauth/request', {
//			consumer_key: localStorage.consumer_key,
//			redirect_uri: localStorage.redirect_uri
//		}, {
//			load: res => {
//				localStorage.request_token = res.code;
//
//				window.location.href = `https://getpocket.com/auth/authorize?request_token=${localStorage.request_token}&redirect_uri=${localStorage.redirect_uri}`
//			}
//		});
//	}

//	!isGetPocket && api.ajax('oauth/authorize', {
//		consumer_key: localStorage.consumer_key,
//		code: localStorage.request_token
//	},{
//		error: err => {
//			request()
//		},
//		load: xhr => {
//			console.log('user is authorized')
//		}
//	});

	const headers = new Headers({
		'Content-Type': 'application/json; charset=UTF8',
		'X-Accept': 'application/json'
	})
//
//	!isGetPocket && fetch(`https://getpocket.com/v3/oauth/authorize`, {
//		method: 'POST',
//		body: JSON.stringify({
//			consumer_key: localStorage.consumer_key,
//			code: localStorage.request_token
//		}),
//		headers
//	}).then(
//		responce => {
//			console.log('success')
//		},
//		error => {
//			console.log('error')
//		})

	!isGetPocket && api.ajax('oauth/authorize', {
		consumer_key: localStorage.consumer_key,
		code: localStorage.request_token
	})
		.then(status)
		.then(
			responce => console.log('success'),
			error => console.log('error')
		)

	console.log('pl tst')

}

//TODO: промисы
//TODO: отрисовать иконку приложения
//Встроить в дом, рядом с иконкой feadly
//Подглядеть, как другие расширения обрабатывают ошибки.
// Как спрятать consumer_key
// поместить некоторые данные в chrome.storage
// https://learn.javascript.ru/fetch
