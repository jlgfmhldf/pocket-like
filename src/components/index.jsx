import { h, Component } from 'preact';
import Button from './button'

export default class Index extends Component {

	render() {
		const { onAdd } = this.props
		return <div>
			<Button onAdd={onAdd} />
		</div>
	}
}
