import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import ArtistsFollowing from './ArtistsFollowing';
import SavedArtists from './SavedArtists';



export default class App extends React.Component {
	render() {
		return (
			<div className="app-container">
				<header>
					<h1>Home</h1>
				</header>

				<main>
			    <Switch>
			    	{/* Put all the buttons below in a Home component */}
			    	<Route exact path='/' component={Home}/>
			      <Route path='/login' component={Login}/>
			      <Route path='/artists-following' component={artistsFollowing}/>
			      <Route path='/saved-artists' component={savedArtists}/>
			    </Switch>
			   </main>


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

