import React from 'react';
import Main from './Main';

export default class App extends React.Component {
	render() {
		return (
			<div className="app-container">
				<header>
					<h1>Home</h1>
				</header>

				<Main />
				
				<footer>
					<p>Footer</p>
				</footer>
			</div>
		);
	}
};

