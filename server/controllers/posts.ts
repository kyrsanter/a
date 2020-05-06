import {IncomingMessage, ServerResponse} from "http";
import {ParamsTypes, PostsResponseType, PostType} from "./types";
import {ErrorMessageType, UserResponseType} from "../types";

const url = require('url');
const fetchNode = require('node-fetch');

exports.getPosts = async (req: IncomingMessage & ParamsTypes, res: ServerResponse) => {
    let {id, canBeModify, limit, skip, all, token} = req.postsParams; //user id
    try {
        let posts: Response = await fetchNode('http://jsonplaceholder.typicode.com/posts');
        let postsJSON: Array<PostType> = await posts.json();
        let neededPosts;
        let author;
        if (!all) {
            neededPosts = postsJSON.filter( (p: PostType) => p.userId == id );
        } else {
            neededPosts = postsJSON;
        }
        if (neededPosts.length === 0) {
            res.statusCode = 404;
            return res.end(JSON.stringify(<ErrorMessageType>{err: 'No one post was founded'}))
        }
        else {
            let newLimit;
            if (Number(limit) > neededPosts.length) {
                newLimit = neededPosts.length;
            }
            let outPosts = neededPosts.slice(Number(skip), Number(newLimit) || Number(limit));
            if (all) {
                for await (let p of outPosts) {
                    let authorId = p.userId;
                    let usersResponse: Response = await fetchNode(`http://jsonplaceholder.typicode.com/users`);
                    let resultJSON: Array<UserResponseType> = await usersResponse.json();
                    let userIdx = resultJSON.findIndex( (u: UserResponseType) => u.id === authorId );
                    p.authorName = resultJSON[userIdx].name;
                    p.canBeModify = authorId === id
                }
            }
            else {
                outPosts.forEach((p) => {
                    p.canBeModify = canBeModify;
                });
            }
            let out: PostsResponseType = {
                posts: outPosts,
                postsLength: neededPosts.length,
                token
            };
            res.end(JSON.stringify(out));
        }
    }
    catch (error) {
        res.statusCode = 404;
        return res.end(JSON.stringify(<ErrorMessageType>{err: 'No one post was founded'}))
    }
};