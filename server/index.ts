import {IncomingMessage, ServerResponse} from "http";

const http = require('http');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');

const server = http.createServer((req: IncomingMessage, res: ServerResponse): void => {
    authRoutes(req, res);
    postsRoutes(req, res);
});

server.listen(process.env.PORT);