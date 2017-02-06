import { h, Component } from 'preact';

export default class Button extends Component {

	render() {
		const { onAdd } = this.props

		return <div
			class="pocketLike"
			onClick={onAdd}
			style={{
				backgroundImage: `url(${chrome.extension.getURL('src/icons/icon.png')})`
			}}
		>
		</div>
	}
}
