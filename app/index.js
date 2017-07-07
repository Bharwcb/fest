require('dotenv').config();
const express = require('express');
const request = require('request');
const querystring = require('querystring');

const app = express();


// ~~~ Replacing all or most of this with Passport Spotify
const cookieParser = require('cookie-parser');
const generateRandomString = (length) => {
	let text = '';
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}


const redirectUri = 'http://localhost:8888/callback/';
const stateKey = 'spotify_auth_state';
const scope = 'user-read-private user-read-email user-follow-read user-library-read user-top-read';

app
.use(express.static(__dirname + '/views'))

.use(cookieParser())

.get('/login', (req, res) => {
	// Use cookies to ensure user didn't just go straight to callback, and rather received random string after authenticated. Cookies are key/value.
	const state = generateRandomString(16);
	res.cookie(stateKey, state);

	// authorization - request spotify 'code'
	const request_auth_code_query = querystring.stringify({
		response_type: 'code',
		client_id: process.env.CLIENT_ID,
		scope: scope,
		redirect_uri: redirectUri,
		state: state,
		// require login every time for testing purposes
		show_dialog: true
	});
	console.log('\nRequesting Authorization Code from Spotify');
	res.redirect('https://accounts.spotify.com/authorize?' + request_auth_code_query);
})

// redirect URI is /callback?authorization_code=...
// request an access token after checking state parameter 
.get('/callback', (req, res) => {
	const code = req.query.code || null;
	const state = req.query.state || null;
	const storedState = req.cookies ? req.cookies[stateKey] : null;

	if (state === null || state !== storedState) {
		res.redirect('/#' + querystring.stringify({
			error: 'state_mismatch'
		}));
	} else {
		res.clearCookie(stateKey);
		const authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			form: {
				code: code,
				redirect_uri: redirectUri,
				grant_type: 'authorization_code'
			},
			headers: {
				'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.ENV.CLIENT_SECRET).toString('base64'))
			},
			json: true
		};

		request.post(authOptions, (err, res, body) => {
			console.log('\nRequesting Access Token using Auth Code');

			if (err) {
				console.log('Error requesting access token using auth code: ', err);
			} else if (!err && res.statusCode === 200) {
				console.log('\nAccess Token granded');
				let access_token = body.access_token;
				const refresh_token = body.refresh_token;
				const options = {
					url: 'https://api.spotify.com/v1/me',
					headers: { 'Authorization': 'Bearer ' + access_token },
					json: true
				};

				// use access token
				request.get(options, (err, res, body) => {
					// console.log('body: ', body);
				});

				// redirect to homepage
				res.redirect('/#' + querystring.stringify({
					access_token: access_token,
					refresh_token: refresh_token
				}));

			} else {
				res.redirect('/#' + querystring.stringify({
					error: 'invalid_token'
				}));
			}

		});
	}
})

.get('/refresh_token', (req, res) => {
	console.log('\nRequesting access token from refresh token');
	// ... refresh stuff
})
// ~~~



.get('/', (req, res) => {
	res.send('Hello, main page');
})

.listen(8888, (err) => {
	if (err) {
		return console.log('\nError connecting to server: ', err);
	};
	console.log('\nListening on 8888');
});