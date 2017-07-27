const React = require('react');

class Layout extends React.Component {
	render() {
		return (
			<div class="app-container">
				<header></header>
				// move buttons out, and only put in this...
				// <div className="app-content">{this.props.children}</div>
				<div id="login-button">
					<a href="/login" class="btn btn-primary">Login</a>
				</div>
				<div id="artists-following-button">
					<a href="/artists-following" class="btn btn-primary">View artists following</a>
				</div>
				<div id="saved-artists-button">
					<a href="saved-artists" class="btn btn-primary">View saved artists</a>
				</div>
				<footer></footer>
			</div>
		);
	}
};

module.exports = Layout;
