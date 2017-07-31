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

				<div id="artists-following-button">
					<a href="artists-following" className="btn btn-primary">View artists following</a>
				</div>
				<div id="saved-artists-button">
					<a href="saved-artists" className="btn btn-primary">View saved artists</a>
				</div>
				
				<footer>
					<p>Footer</p>
				</footer>
			</div>
		);
	}
};

