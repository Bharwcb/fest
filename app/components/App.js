import React from 'react';
import Main from './Main';
import Buttons from './Buttons';
import DisplayArtists from './DisplayArtists';

export default class App extends React.Component {
	render() {
		return (
			<div className="app-container">
				<Main />
				<Buttons />
				<DisplayArtists />
			</div>
		);
	}
};

