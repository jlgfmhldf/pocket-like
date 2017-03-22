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
		this.onAdd()
	}

	onAdd = () => {
		const { add } = this.props

		const {
			requestToken,
			accessToken,
			isAuthorizedToken,
			getRequestToken,
			getAccessToken,
		} = this.props

		if(!requestToken) {
			getRequestToken()
			return
		}

		if(requestToken && !isAuthorizedToken) {
			location.href = `
			https://getpocket.com/auth/authorize?
			request_token=${requestToken}&
			redirect_uri=${window.location.href}`
			return
		}

		if (!accessToken) {
			getAccessToken(requestToken)
			return
		}

		add()
	}

	render() {

		console.log(this.props)

		return <div>
			<Button onClick={this.onAdd()} />
		</div>
	}

}
