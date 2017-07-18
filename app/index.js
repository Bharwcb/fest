require('dotenv').config();
const express = require('express');
const request = require('request');
const querystring = require('querystring');
const app = express();
const Spotify = require('spotify-web-api-node');
const cookieParser = require('cookie-parser');

const stateKey = 'spotify_auth_state';
const scopes = ['user-read-private', 'user-read-email', 'user-follow-read', 'user-library-read', 'user-top-read'];

const spotifyApi = new Spotify({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: 'http://localhost:8888/callback/'
});

function generateRandomString(length) {
	let text = '';
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

function refreshToken() {
	spotifyApi.refreshAccessToken()
  .then((data) => {
    console.log('Refreshed access token');
    spotifyApi.setAccessToken(data.body['access_token']);
  }, (err) => {
    console.log('Could not refresh access token', err);
  });
}

app
.use(express.static(__dirname + '/views'))
.use(cookieParser())

// clicks login button - build query string direct to accounts.spotify/authorize?client_id=..response_type=code..redirect_uri..scope..state
.get('/login', (req, res) => {
	const state = generateRandomString(16);
	res.cookie(stateKey, state);
	const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
	console.log('\nRequesting Authorization Code from Spotify.');
	res.redirect(authorizeURL);
})

/*
- Verify that state we put in the cookie matches the state in the query param
- Redirect URI from spotify looks like /callback?authorization_code=...
- Use auth code to request access token
*/
.get('/callback', (req, res) => {
	const { code, state } = req.query;
	const storedState = req.cookies ? req.cookies[stateKey] : null;
	if (state === null || state !== storedState) {
		res.redirect('/#' + querystring.stringify({
			error: 'state_mismatch'
		}));
	} else {
		res.clearCookie(stateKey);
		// request access token using auth code ('code')
		console.log('\nRequesting Access Token using Auth Code');

		spotifyApi.authorizationCodeGrant(code)
		.then((data) => {
			console.log('\nAccess token granted');
			const { expires_in, access_token, refresh_token } = data.body;
			spotifyApi.setAccessToken(data.body['access_token']);
	    spotifyApi.setRefreshToken(data.body['refresh_token']);
			res.redirect('/#' + querystring.stringify({
				access_token: access_token,
				refresh_token: refresh_token
			}));
		}).catch((err) => {
			console.log('Err: ', err);
		});
	}
})

.get('/artists-following', (req, res) => {
	// ~~~ artists following sync API call
	let artistsFollowing = [];

	spotifyApi.getFollowedArtists({ limit : 3 })
  .then((data) => {
    // 'This user is following 1051 artists!'
    console.log('\nFollowing ', data.body.artists.total, ' artists.');
	  console.log('\n(Before build) Artists Following Array Length: ', artistsFollowing.length);

    buildArtistsFollowing(data);

  	function buildArtistsFollowing(data) {
  		console.log('Data.body: ', data.body);
  		console.log('First artist: ', data.body.artists.items[0].name);
  		console.log('Second artist: ', data.body.artists.items[1].name);
  	// 	console.log('Data.artists[0].items: ', data.artists[0].items);
			// data.body.artists.items.forEach((artist) => {
			// 	artistsFollowing.push(artist.name);
			// });
		};
	  console.log('\n(After build) Artists Following Array Length: ', artistsFollowing.length);
  }, (err) => {
    console.log('Error in artists following call: ', err);
  });
	// ~~~ end of artists following call
})

.listen(8888, (err) => {
	if (err) {
		return console.log('\nError connecting to server: ', err);
	};
	console.log('\nListening on 8888');
});