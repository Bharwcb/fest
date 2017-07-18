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

const generateRandomString = (length) => {
	let text = '';
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

app
.use(express.static(__dirname + '/views'))
.use(cookieParser())

.get('/login', (req, res) => {
	const state = generateRandomString(16);
	res.cookie(stateKey, state);
	const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
	console.log('\nRequesting Authorization Code from Spotify. Redirecting to: ', authorizeURL);
	res.redirect(authorizeURL);
})

/*
- Verify that the state we put in the cookie matches the state in the query param, then request access token
- Redirect URI looks like /callback?authorization_code=...
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

			const { expires_in, access_token, refresh_token } = data.body;

			console.log('\ntoken: ', access_token);
			console.log('\ntype of: ', typeof access_token);
			spotifyApi.setAccessToken(data.body['access_token']);
			console.log('\ntest: ', spotifyApi.access_token);
			console.log('\ntest: ', spotifyApi['access_token']);
			console.log('\ntest: ', spotifyApi[access_token]);

			// ~~~~~ TEST AN API CALL HERE? ~~~~~

			res.redirect('/#' + querystring.stringify({
				access_token: access_token,
				refresh_token: refresh_token
			}));
		}).catch((err) => {
			console.log('Err: ', err);
		});

	}
})

.listen(8888, (err) => {
	if (err) {
		return console.log('\nError connecting to server: ', err);
	};
	console.log('\nListening on 8888');
});