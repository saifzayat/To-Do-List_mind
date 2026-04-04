import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

// json-server is a CommonJS module, so we need createRequire to import it in an ESM context
const require = createRequire(import.meta.url);
const jsonServer = require('json-server');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(
	path.join(__dirname, 'db.json')
);
const middlewares = jsonServer.defaults();

// Add CORS headers so the Vite frontend can reach the API from any origin
server.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, PATCH, DELETE, OPTIONS'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.sendStatus(204);
		return;
	}
	next();
});

server.use(middlewares);
server.use('/api', router);

export default server;
