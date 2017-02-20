import { h, Component } from 'preact';

export default class Button extends Component {

	render() {
		const { onClick } = this.props

		return <div
			class='pocketLike'
			onClick={onClick}
			style={{
				backgroundImage: `url(${chrome.extension.getURL('src/icons/icon.png')})`
			}}
		>
		</div>
	}
}
