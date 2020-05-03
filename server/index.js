"use strict";
var http = require('http');
require('dotenv').config();
var authRoutes = require('./routes/auth');
var postsRoutes = require('./routes/posts');
var server = http.createServer(function (req, res) {
    authRoutes(req, res);
    postsRoutes(req, res);
});
server.listen(process.env.PORT);
//# sourceMappingURL=index.js.map