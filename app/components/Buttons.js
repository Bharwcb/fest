import React from 'react';
import { Link } from 'react-router-dom';

export default class Buttons extends React.Component {
	render() {
		return (
			<div>
				<div>
					<Link to='/login' className="btn btn-primary">Login</Link>
				</div>
				<div>
					<Link to='/artists-following' className="btn btn-primary">View artists following</Link>
				</div>
				<div>
					<Link to='/saved-artists' className="btn btn-primary">View saved artists</Link>
				</div>
			</div>
		);
	}
};