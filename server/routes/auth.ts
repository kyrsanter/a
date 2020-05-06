import {IncomingMessage, ServerResponse} from "http";
import {AuthRequestType} from "./types";
import {UrlWithStringQuery} from "url";
import {ErrorMessageType} from "../types";
const http = require('http');
const url = require('url');
const jwt = require('jsonwebtoken');
let contr = require('../controllers/auth');
const { checkJWT } = require('../middleware/checkjwt');

module.exports = (req: IncomingMessage & AuthRequestType , res: ServerResponse) => {

    const reqUrl:UrlWithStringQuery = url.parse(<string>req.url, true);

    if (reqUrl.pathname === '/login' && req.method === 'POST') {
        contr.loginUser(req, res);
    }

    if (reqUrl.pathname === '/user' && req.method === 'GET') {
        try {
            checkJWT(req, res);
            if (req.data && req.data.loggedIn) {
                contr.getCurrentUser(req, res)
            }
            else {
                res.statusCode = 401;
                return res.end(JSON.stringify(<ErrorMessageType>{err: 'Login too watch this page'}));
            }
        }
        catch(error) {
            return res.end(JSON.stringify(<ErrorMessageType>{err: 'Error'}))
        }
    }

    if (reqUrl.pathname === '/users' && req.method === 'GET') {
        try {
            checkJWT(req, res);
            if (req.data && req.data.loggedIn) {
                let {limit, skip} = JSON.parse(JSON.stringify(reqUrl.query));
                req.usersParams = {
                    limit,
                    skip,
                    token: req.data.token
                };
                contr.getUsers(req, res);
            }
            else {
                res.statusCode = 401;
                return res.end(JSON.stringify({err: 'Login too watch this page'}));
            }
        }
        catch(error) {
            return res.end(JSON.stringify({err: 'Error'}))
        }
    }
};

