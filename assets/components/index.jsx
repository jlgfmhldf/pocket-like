import { h, render, Component } from 'preact';

export  default class Clock extends Component {

	render() {
		console.log();
		let time = new Date().toLocaleTimeString();
		return <span>{ time }</span>;
	}
}
