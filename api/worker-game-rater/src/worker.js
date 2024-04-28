export default {
	async fetch(request, env) {
		const CLIENT_ID = env.CLIENT_ID;

		const accessToken = await fetchAccessTokenFromTwitch(env);

		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
			'Access-Control-Max-Age': '86400',
		};

		const DEFAULT_API_URL = 'https://api.igdb.com/v4/games';

		// The endpoint you want the CORS reverse proxy to be on
		const PROXY_ENDPOINT = '/api';

		// The rest of this snippet for the demo page

		async function handleRequest(request) {
			const url = new URL(request.url);
			const originHeader = request.headers.get('Origin');
			let apiUrl = url.searchParams.get('apiurl');

			if (apiUrl == null) {
				apiUrl = DEFAULT_API_URL;
			}

			// Rewrite request to point to API URL. This also makes the request mutable
			// so you can add the correct Origin header to make the API server think
			// that this request is not cross-site.
			request = new Request(apiUrl, request);
			request.headers.set('Origin', new URL(apiUrl).origin);
			request.headers.set('Client-ID', CLIENT_ID);
			request.headers.set('Authorization', `Bearer ${accessToken}`);
			let response = await fetch(request);
			// Recreate the response so you can modify the headers

			response = new Response(response.body, response);
			// Set CORS headers

			const allowedOrigins = ['https://top-games-rater.com', 'http://localhost:5173'];

			response.headers.set('Access-Control-Allow-Origin', allowedOrigins.includes(originHeader) ? originHeader : '');

			// Append to/Add Vary header so browser will cache response correctly
			response.headers.append('Vary', 'Origin');

			return response;
		}

		async function handleOptions(request) {
			if (
				request.headers.get('Origin') !== null &&
				request.headers.get('Access-Control-Request-Method') !== null &&
				request.headers.get('Access-Control-Request-Headers') !== null
			) {
				// Handle CORS preflight requests.
				return new Response(null, {
					headers: {
						...corsHeaders,
						'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers'),
					},
				});
			} else {
				// Handle standard OPTIONS request.
				return new Response(null, {
					headers: {
						Allow: 'GET, HEAD, POST, OPTIONS',
					},
				});
			}
		}

		const url = new URL(request.url);
		if (url.pathname.startsWith(PROXY_ENDPOINT)) {
			if (request.method === 'OPTIONS') {
				// Handle CORS preflight requests
				return handleOptions(request);
			} else if (request.method === 'GET' || request.method === 'HEAD' || request.method === 'POST') {
				// Handle requests to the API server
				return handleRequest(request);
			} else {
				return new Response(null, {
					status: 405,
					statusText: 'Method Not Allowed',
				});
			}
		} else return new Response('Not Found', { status: 404 });
	},
};

const fetchAccessTokenFromTwitch = async (env) => {
	const CLIENT_ID = env.CLIENT_ID;
	const CLIENT_SECRET = env.CLIENT_SECRET;

	const kv = env.KV;

	const existingToken = await kv.get('twitch_access_token');

	if (existingToken) {
		return existingToken;
	}

	const url = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`;

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const data = await response.json();
	const access_token = data.access_token;

	await kv.put('twitch_access_token', access_token, { expirationTtl: data.expires_in - 60 });

	return access_token;
};
