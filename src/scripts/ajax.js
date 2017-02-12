export default function( path, data ) {
	const headers = new Headers({
		'Content-Type': 'application/json; charset=UTF8',
		'X-Accept': 'application/json'
	})

	const status = response => {
		if (response.status >= 200 && response.status < 300) {
			return Promise.resolve(response.json())
		} else {
			const { statusText, status } = response

			return Promise.reject({ statusText, status })
		}
	}

	return fetch(`https://getpocket.com/v3/${path}`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers
	}).then(status)
}
