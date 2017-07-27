const React = require('react');

class Layout extends React.Component {
	render() {
		return (
			<div className="app-container">
				<header></header>

			{/* 
				Eventually take buttons out and add back as components.. leaving only:
				<div className="app-content">{this.props.children}</div> 
			*/}

				<div id="login-button">
					<a href="login" className="btn btn-primary">Login</a>
				</div>
				<div id="artists-following-button">
					<a href="artists-following" className="btn btn-primary">View artists following</a>
				</div>
				<div id="saved-artists-button">
					<a href="saved-artists" className="btn btn-primary">View saved artists</a>
				</div>
				<footer></footer>
			</div>
		);
	}
};

module.exports = Layout;
