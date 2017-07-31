import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import ArtistsFollowing from './ArtistsFollowing';
import SavedArtists from './SavedArtists';

export default class Main extends React.Component {
	render() {
		return (
			<main>
		    <Switch>
			  	{/* Putting all the buttons below in a Home component */}
			  	<Route exact path='/' component={Home}/>
			    <Route path='/login' component={Login}/>
			    <Route path='/artists-following' component={ArtistsFollowing}/>
			    <Route path='/saved-artists' component={SavedArtists}/>
			  </Switch>
		  </main>
	  );
	};
};
   
