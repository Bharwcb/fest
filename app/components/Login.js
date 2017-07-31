import React from 'react';

export default class Login extends React.Component {
	render() {
		return (
			<p>Login Component called</p>
		);
	}
};

// require('dotenv').config();
// const express = require('express');
// const request = require('request');
// const querystring = require('querystring');
// const app = express();
// const Spotify = require('spotify-web-api-node');
// const cookieParser = require('cookie-parser');
// const object = require('lodash/fp/object');
// const array = require('lodash/array');

// const stateKey = 'spotify_auth_state';
// const scopes = ['user-read-private', 'user-read-email', 'user-follow-read', 'user-library-read', 'user-top-read'];

// const spotifyApi = new Spotify({
// 	clientId: process.env.CLIENT_ID,
// 	clientSecret: process.env.CLIENT_SECRET,
// 	redirectUri: 'http://localhost:8888/callback/'
// });

// function generateRandomString(length) {
// 	let text = '';
// 	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
// 	for (var i = 0; i < length; i++) {
// 		text += possible.charAt(Math.floor(Math.random() * possible.length));
// 	}
// 	return text;
// }

// function refreshToken() {
// 	spotifyApi.refreshAccessToken()
//   .then((data) => {
//     console.log('Refreshed access token');
//     spotifyApi.setAccessToken(data.body['access_token']);
//   }, (err) => {
//     console.log('Could not refresh access token', err);
//   });
// }

// app
// .use(express.static(__dirname + '/views'))
// .use(cookieParser())

// // clicks login button - build query string direct to accounts.spotify/authorize?client_id=..response_type=code..redirect_uri..scope..state
// .get('/login', (req, res) => {
// 	const state = generateRandomString(16);
// 	res.cookie(stateKey, state);
// 	const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
// 	console.log('\nRequesting Authorization Code from Spotify.');
// 	res.redirect(authorizeURL);
// })

// /*
// - Verify that state we put in the cookie matches the state in the query param
// - Redirect URI from spotify looks like /callback?authorization_code=...
// - Use auth code to request access token
// */
// .get('/callback', (req, res) => {
// 	const { code, state } = req.query;
// 	const storedState = req.cookies ? req.cookies[stateKey] : null;
// 	if (state === null || state !== storedState) {
// 		res.redirect('/#' + querystring.stringify({
// 			error: 'state_mismatch'
// 		}));
// 	} else {
// 		res.clearCookie(stateKey);
// 		// request access token using auth code ('code')
// 		console.log('\nRequesting Access Token using Auth Code');

// 		spotifyApi.authorizationCodeGrant(code)
// 		.then((data) => {
// 			console.log('\nAccess token granted');
// 			const { expires_in, access_token, refresh_token } = data.body;
// 			spotifyApi.setAccessToken(data.body['access_token']);
// 	    spotifyApi.setRefreshToken(data.body['refresh_token']);
// 			res.redirect('/#' + querystring.stringify({
// 				access_token: access_token,
// 				refresh_token: refresh_token
// 			}));
// 		}).catch((err) => {
// 			console.log('Err: ', err);
// 		});
// 	}
// })

// .get('/artists-following', (req, res) => {
// 	let artistsFollowing = [];
// 	artistsFollowingCallSync();

// 	/* 
// 	* first call - no 'after' option
// 	* response's 'cursor' value is {after: last_artist_id}
// 	* spotifyApi.getFollowedArtists({ limit : 3, cursor }) = spotifyApi.getFollowedArtists({ limit : 3, after: 'asdgsadg' })
// 	*/

// 	function artistsFollowingCallSync(cursors=null) {
// 		spotifyApi.getFollowedArtists( object.merge({ limit : 3 }, cursors) )
// 	  .then((data) => {
// 	    buildArtistsFollowing(data);
// 	    let cursors = data.body.artists.cursors;
// 			if (data.body.artists.next) {
// 				return artistsFollowingCallSync(cursors);
// 			};
// 		  console.log('\nArtists Following Array Length: ', artistsFollowing.length);
// 	  }, (err) => {
// 	    console.log('Error in artists following call: ', err);
// 	  });
//   }

// 	function buildArtistsFollowing(data) {
// 		data.body.artists.items.forEach((artist) => {
// 			artistsFollowing.push(artist.name);
// 		});
// 	};
// })

// .get('/saved-artists', (req, res) => {
// 	let savedArtists = [];
// 	let savedArtistsPromises = [];
// 	let offset = 0;

// 	savedArtistsCallAsync();

// 	function savedArtistsCallAsync(offset=0) {

// 		return spotifyApi.getMySavedTracks( object.merge({ limit: 50 }, { offset: offset }) )
// 		.then((data) => {
// 			buildSavedArtists(data);

// 		  while (offset < data.body.total) {
// 		  	promise = spotifyApi.getMySavedTracks( object.merge({ limit : 50 }, { offset: offset }) )
// 		  	.then((data) => {
// 		  		buildSavedArtists(data)
// 		  	}, (err) => {
// 		  		console.log('Error in additional saved artists calls: ', err);
// 		  	})
// 		  	savedArtistsPromises.push(promise);
// 				offset += 50;
// 		  };

// 		  return Promise.all(savedArtistsPromises)
// 		  .then(() => {
// 		  	savedArtists = array.uniq(savedArtists);
// 			  console.log('\nSaved Artists Array Length: ', savedArtists.length);
// 		  })
		  
// 		}, (err) => {
// 		  console.log('Error in saved artists call: ', err);
// 		});

// 	};

// 	function buildSavedArtists(data) {
// 		data.body.items.forEach((track) => {
// 			track.track.artists.forEach((artist) => {
// 				savedArtists.push(artist.name);
// 			})
// 		});
// 	};

// })

// .listen(8888, (err) => {
// 	if (err) {
// 		return console.log('\nError connecting to server: ', err);
// 	};
// 	console.log('\nListening on 8888');
// });