import { h, Component } from 'preact';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { pick } from 'lodash'

import Button from '../components/button'

const mapStateToProps = state => {
	return {
		...state
	}
}

const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators(
			pick(
				actions, ...[
					'add',
					'getRequestToken',
					'getAccessToken',
				]
			),
			dispatch
		)
	}
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
	componentWillMount() {
		const {
			requestToken,
			accessToken,
			isAuthorizedToken,
			getRequestToken,
			getAccessToken,
		} = this.props

		if(!requestToken) {
			getRequestToken()
		}

		if(requestToken && !isAuthorizedToken) {

			location.href = `
			https://getpocket.com/auth/authorize?
			request_token=${requestToken}&
			redirect_uri=${window.location.href}`

		}

		if (!accessToken) {
			getAccessToken(requestToken)
		}

	}

	render() {
		const { add } = this.props

		console.log(this.props)

		return <div>
			<Button onClick={add} />
		</div>
	}

}
