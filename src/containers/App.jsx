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
		actions: bindActionCreators(actions, dispatch) //TODO remove bindActionCreators
	}
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
	render() {
		const { add } = this.props.actions

		console.log(this.props)

		return <div>
			<Button onAdd={add} />
		</div>
	}

}
