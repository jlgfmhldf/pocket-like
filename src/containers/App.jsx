import { h, Component } from 'preact';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

import Button from '../components/button'

const mapStateToProps = state => {
	return {
		...state
	}
}

const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({
			add: actions.add,
		}, dispatch)
	}
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
	render() {
		const { add } = this.props

		console.log(this.props)

		return <div>
			<Button onClick={add} />
		</div>
	}

}
