import React from 'react';
import Buttons from './Buttons';
import DisplayArtists from './DisplayArtists';

export default class App extends React.Component {
	render() {
		return (
			<div className="app-container">
				<Buttons />
				<DisplayArtists />
			</div>
		);
	}
};

