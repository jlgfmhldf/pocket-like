import { h, Component } from 'preact';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from './button';
import * as actions from '../actions';

const mapStateToProps = state => {
	return {
		article: state.article
	}
}

const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators(
			actions, 
			dispatch
		)
	}
}

@connect(mapStateToProps,mapDispatchToProps)
export default class App extends Component {

	onAdd = () => {
		const { addToPocket } = this.props

		addToPocket()
	}

	render() {
		return <div>
			<Button onClick={this.onAdd} />
		</div>
	}
}
