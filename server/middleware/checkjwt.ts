import {
    DecodedCallBackType,
    GeneratorTokenReturn,
    GeneratorTokenType,
    RequestJWTDataType,
    TokenPayloadType,
    VerifyCallBackType
} from "./types";
import {IncomingMessage, ServerResponse} from "http";
import {JsonWebTokenError, TokenExpiredError, VerifyErrors} from "jsonwebtoken";
import {ErrorMessageType} from "../types";
import {UrlWithStringQuery} from "url";
const jwt = require('jsonwebtoken');
const url = require('url');
const generatorCookie = require('../helpers/generate-new-cookie');
let contr = require('../controllers/auth');



const generateNewToken:GeneratorTokenType = (obj: TokenPayloadType, secret: string | undefined, time: string | undefined):GeneratorTokenReturn => {
    let newToken = jwt.sign(
        obj,
        secret,
        {expiresIn: time}
    );
    return {
        newToken,
        id: obj.userId
    }
};

const checkjwt = (req: IncomingMessage & RequestJWTDataType, res: ServerResponse) => {
    let newToken: string;                             // use to refresh token
    let newId: string;                                // use to refresh token
    let token: string;
    //@ts-ignore
    let authHeader = req.headers.authorization;
    if (authHeader) {
        token = authHeader.replace('Bearer ', '');
        if (!token) {
            res.statusCode = 401;
            return res.end(JSON.stringify({err: 'Login too watch this page'}))
        }
        else {
            jwt.verify(token, process.env.SECRET_TOKEN, (err: VerifyCallBackType, decoded: DecodedCallBackType): void => {
                if (err && err.name === 'TokenExpiredError' && Date.parse(err.expiredAt) < Date.now() && err.message === 'jwt expired') { // if main access token from localstorage has been expired
                    //=====================================================

                    // @ts-ignore
                    if (!req.headers.cookie.includes('refresh ')) { // then check do we have a cookie ?
                        res.statusCode = 401;
                        return res.end(JSON.stringify(<ErrorMessageType>{err: 'Login too watch this page'})) // if no cookie with refresh in it - send an error to client
                    }
                    // @ts-ignore
                    let cookie: string = req.headers.cookie.replace('refresh=', '').trim();

                    jwt.verify(cookie, process.env.REFRESH_TOKEN, (error: VerifyCallBackType, decodedRefresh: DecodedCallBackType) => { // verifying token from cookie (refresh)
                        if (error) {  // any error does not give an access to secret pages
                            res.statusCode = 401;
                            return res.end(JSON.stringify(<ErrorMessageType>{err: 'Login too watch this page'}));
                        }
                        // creating new access token for localstorage and refresh token for cookies
                        let newAccessToken:GeneratorTokenReturn;
                            newAccessToken = generateNewToken({userId: decodedRefresh.userId}, process.env.SECRET_TOKEN, process.env.ACCESS_TOKEN_TIME); // generator of new main access token
                        let newRefreshToken: GeneratorTokenReturn;
                            newRefreshToken = generateNewToken({userId: decodedRefresh.userId}, process.env.REFRESH_TOKEN, process.env.REFRESH_TOKEN_TIME); // generator of new main refresh token

                        generatorCookie(newRefreshToken.newToken, res);

                        newToken = newAccessToken.newToken;
                        newId = newAccessToken.id;
                    });
                    //=============================================================
                }
                else if (err && err.name !== 'TokenExpiredError') {
                    res.statusCode = 401;
                    return res.end(JSON.stringify(<ErrorMessageType>{err: 'Login too watch this page'}))
                }
                const reqUrl: UrlWithStringQuery = url.parse(<string>req.url, true);
                let queryId:string = JSON.parse(JSON.stringify(reqUrl.query)).id;
                let id: string = !decoded ? newId : decoded.userId;        // new id will be not undefined after refresh token

                if (id === queryId) {
                    req.data = { // if logged in user wants to visit his own page and his posts
                        id,
                        admin: true, // if id in token equals id in query string - its an admin
                        loggedIn: true, // 100% true
                        token: newToken // if main access token is ok and were not refreshed !!!! here will be undefined. And here will be a new token if main access token was expired
                    };
                }
                else {
                    req.data = { // if logged in user wants to visit an alien page or alien posts
                        id: queryId,
                        admin: false,
                        loggedIn: true, // 100% true
                        token: newToken, // if main access token is ok and were not refreshed !!!! here will be undefined. And here will be a new token if main access token was expired
                    };
                }
            })
        }
    }
};

module.exports = {
    generateNewToken,
    checkJWT: checkjwt
};