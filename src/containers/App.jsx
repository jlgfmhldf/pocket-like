import { h, Component } from 'preact';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { pick } from 'lodash'
import lodash from 'lodash'

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
				...[
					'add',
					'getRequestToken'
				]
			),
			dispatch
		)
	}
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
	componentWillMount() {
		const { requestToken, authorizeToken } = this.props

		if(!requestToken) {
			// getRequestToken()
		}

		if(requestToken && !authorizeToken) {
			// getAuthorizeToken()
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
