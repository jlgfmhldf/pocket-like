import ajax from './ajax'

export default class PocketLike {
	constructor(consumerKey) {
		this.consumerKey = consumerKey
	}

	request(redirectURI) {
		return ajax('oauth/request', {
			consumer_key: this.consumerKey,
			redirect_uri: redirectURI,
		})
	}

	authorize(code) {
		return ajax('oauth/authorize', {
			consumer_key: this.consumerKey,
			code,
		})
	}

	add(accessToken,article) {
		return ajax('add', {
			title: article.title, //TODO 1 1
			url: article.url,
			consumer_key: this.consumerKey,
			access_token: accessToken,
		})
	}
}
