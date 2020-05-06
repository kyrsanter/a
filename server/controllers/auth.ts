import {IncomingMessage, ServerResponse} from "http";
import {ErrorMessageType, RequestUsersParams, UserResponseType} from "../types";
import {DataType, GeneratorTokenReturn} from "../middleware/types";
import {CurrentUSerResponseType, LoginUserResponseType} from "./types";
import {MappedUserList, UsersResponse} from "../routes/types";

const url = require('url');
const fetchNode = require('node-fetch');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const {generateNewToken} = require('../middleware/checkjwt');
const generatorCookie = require('../helpers/generate-new-cookie');

exports.loginUser = (req: IncomingMessage, res: ServerResponse) => {
    let body: string = '';
    req.on('data', (chunk: Buffer) => {
        body += chunk;
    });
    req.on('end', async () => {
        let postBody: string = JSON.parse(body);
        if (!validator.isEmail(postBody)) {
            res.statusCode = 401;
            return res.end(JSON.stringify(<ErrorMessageType>{err: 'Bad email'}));
        }
    try {
        let users: Response = await fetchNode('http://jsonplaceholder.typicode.com/users');
        let usersJSON: Array<UserResponseType> = await users.json();
        let neededUser = usersJSON.filter( (u: UserResponseType) => u.email === postBody );
        if (neededUser.length === 0) {
            res.statusCode = 401;
            return res.end(JSON.stringify(<ErrorMessageType>{err: 'User with the same email was not found'}))
        }
        else {
            let {newToken: token}: GeneratorTokenReturn = generateNewToken({userName: neededUser[0].name, userId: neededUser[0].id}, process.env.SECRET_TOKEN, process.env.ACCESS_TOKEN_TIME);
            let {newToken: refreshToken}: GeneratorTokenReturn = generateNewToken({userName: neededUser[0].name, userId: neededUser[0].id}, process.env.REFRESH_TOKEN, process.env.REFRESH_TOKEN_TIME);
            generatorCookie(refreshToken, res);
            let response: LoginUserResponseType = {
                userId: neededUser[0].id,
                token,
            };
            res.end(JSON.stringify(response))
        }
    }
    catch(err) {
        res.statusCode = 404;
        return res.end(JSON.stringify(<ErrorMessageType>{err: 'login too watch this page'}))
    }
    });
};

exports.getCurrentUser = async (req: IncomingMessage & {data: DataType}, res: ServerResponse) => {
    try {
        let {id, admin, token}: DataType = req.data;
        let users: Response = await fetchNode('http://jsonplaceholder.typicode.com/users');
        let usersJSON: Array<UserResponseType> = await users.json();
        let neededUser = usersJSON.filter((u: UserResponseType) => u.id == id);
        if (neededUser.length === 0) {
            res.statusCode = 404;
            return res.end(JSON.stringify({err: 'User was not found'}))
        }
        else {
            let out:CurrentUSerResponseType = {
                user:{...neededUser[0], admin},
                token
            };
            res.end(JSON.stringify(out));
        }
    }
    catch(err) {
        return res.end(JSON.stringify(<ErrorMessageType>{err: 'Error'}))
    }
};

exports.getUsers = async (req: IncomingMessage & RequestUsersParams, res: ServerResponse) => {
    let {limit, skip, token} = req.usersParams;
    try {
        let usersResponse: Response = await fetchNode('http://jsonplaceholder.typicode.com/users');
        let usersJSON:Array<UserResponseType> = await usersResponse.json();
        if (usersJSON.length === 0) {
            res.statusCode = 404;
            return res.end(JSON.stringify(<ErrorMessageType>{err: 'Users were not found'}))
        }
        else {
            let newLimit;
            if (Number(limit) > usersJSON.length) {
                newLimit = usersJSON.length;
            }
            let limitedUsers = usersJSON.slice(Number(skip), Number(newLimit) || Number(limit));
            let users = limitedUsers.map( (u: UserResponseType): MappedUserList => {
                return {
                    name: u.name,
                    phone: u.phone,
                    email: u.email,
                    id: u.id,
                    username: u.username
                }
            });
            let out: UsersResponse = {
                users,
                usersLength: usersJSON.length,
                token
            };
            res.end(JSON.stringify(out));
        }
    }
    catch(err) {
        res.statusCode = 404;
        return res.end(JSON.stringify(<ErrorMessageType>{err: 'Users were not found'}))
    }
};