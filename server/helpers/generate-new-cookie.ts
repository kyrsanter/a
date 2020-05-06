import {ServerResponse} from "http";

module.exports = (refreshedToken: string, res: ServerResponse) => {
    let nowTime = new Date().getTime();
    if (!process.env.REFRESH_TOKEN_TIME) return;
    let cookieLife: number = +process.env.REFRESH_TOKEN_TIME.replace('m', '') * 60 * 1000;
    let fullTime = +nowTime + +cookieLife;
    res.setHeader('Set-Cookie', 'refresh=' + refreshedToken + ';' + 'expires=' + new Date(fullTime));
};