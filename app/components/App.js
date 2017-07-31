import React from 'react';
import Main from './Main';
import Footer from './Footer';
import Header from './Header';

export default class App extends React.Component {
	render() {
		return (
			<div className="app-container">
				<Header />
				<Main />
				<Footer />
			</div>
		);
	}
};

