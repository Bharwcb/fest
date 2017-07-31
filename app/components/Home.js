import React from 'react';

export default class Home extends React.Component {
	render() {
		return (
			<div>
				<div>
					<a href="login" className="btn btn-primary">Login</a>
				</div>
				<div>
					<a href="artists-following" className="btn btn-primary">View artists following</a>
				</div>
				<div>
					<a href="saved-artists" className="btn btn-primary">View saved artists</a>
				</div>
			</div>
		);
	}
};




