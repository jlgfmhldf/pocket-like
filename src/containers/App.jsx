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
					'addOrAuthorizeAndAdd',
				]
			),
			dispatch
		)
	}
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

	onAdd = () => {
		const { addOrAuthorizeAndAdd } = this.props

		addOrAuthorizeAndAdd()
	}

	render() {
		return <div>
			<Button onClick={this.onAdd} />
		</div>
	}

}
