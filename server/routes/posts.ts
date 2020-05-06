import {IncomingMessage, ServerResponse} from "http";
import {ErrorMessageType} from "../types";
import {AuthRequestType, ParamsTypes} from "../middleware/types";

const http = require('http');
const url = require('url');
const jwt = require('jsonwebtoken');
const controller = require('../controllers/posts');
const { checkJWT } = require('../middleware/checkjwt');

module.exports = (req: IncomingMessage & AuthRequestType & ParamsTypes, res: ServerResponse) => {  // finished here
    let reqURL = url.parse(req.url, true);

    if (reqURL.pathname === '/posts/user' && req.method === 'GET') {
        checkJWT(req, res);

        if (req.data && req.data.loggedIn) {
            let {id, limit, skip} = JSON.parse(JSON.stringify(reqURL.query));
            req.postsParams = {
                id, // users id from query string
                limit,
                skip,
                all: false,
                canBeModify: req.data.admin,
                token: req.data.token
            };
            controller.getPosts(req, res)
        }
        else {
            res.statusCode = 401;
            return res.end(JSON.stringify(<ErrorMessageType>{err: 'Login too watch this page'}));
        }
    }

    if (reqURL.pathname === '/posts' && req.method === 'GET') {
        checkJWT(req, res);
        if (req.data && req.data.loggedIn) {
            let {limit, skip} = JSON.parse(JSON.stringify(reqURL.query));
            req.postsParams = {
                id: req.data.id, // id from token
                adminId: req.data.adminId,
                limit,
                skip,
                all: true,
                canBeModify: req.data.admin,
                token: req.data.token
            };
            controller.getPosts(req, res)
        } else {
            res.statusCode = 401;
            return res.end(JSON.stringify(<ErrorMessageType>{err: 'Login too watch this page'}));
        }
    }
};
