import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';

import Login from './Login';
import ArtistsFollowing from './ArtistsFollowing';
import SavedArtists from './SavedArtists';

export default class Main extends React.Component {
	render() {
		return (
			<main>
		    <Switch>
			    <Route path='/login' component={Login}/>
			    <Route path='/artists-following' component={ArtistsFollowing}/>
			    <Route path='/saved-artists' component={SavedArtists}/>
			  </Switch>
		  </main>
	  );
	};
};

