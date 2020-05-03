import React, {FC, useCallback, useRef} from "react";
import './posts.css';
import PostItem from "../post-item";
import {Link} from "react-router-dom";
import ScrollLoader from "../scroll-loader/scroll-loader";
import {_AllTypes, PostType} from "../../types";
import {PropsType} from "./types";

const Posts: FC<PropsType> = ({posts, loadMore, loading}) => {

    let observe = useRef<_AllTypes>();

    let options: IntersectionObserverInit = {
        root: null,
        threshold: 1
    };

    // @ts-ignore
    let lastElement = useCallback( (node: HTMLDivElement) => {
        if (observe.current) {
            observe.current.disconnect()
        }
        observe.current = new IntersectionObserver((entries: Array<IntersectionObserverEntry>) => {
            if (entries[0].isIntersecting && !loading) {
                loadMore()
            }
        }, options);
        if (node) {
            observe.current.observe(node)
        }
    });
    
    return (
        <div className="posts">
            <div className="container">
                    {
                        posts.map( (post: PostType, i: number) => {
                            if (i === posts.length - 1) {
                                return (
                                    <div className='row' key={post.id}>
                                        <div className="col-lg-3">
                                            <div className="div">
                                                <p>Author:</p>
                                                <Link className='btn btn-success' to={`/users/${post.userId}`}>{post.authorName}</Link>
                                            </div>
                                        </div>
                                        <div className="col-lg-9">
                                            <div ref={lastElement} className="post-wrap">
                                                <PostItem post={post} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div className='row' key={post.id}>
                                        <div className="col-lg-3">
                                            <div className="div">
                                                <p>Author:</p>
                                                <Link className='btn btn-success' to={`/users/${post.userId}`}>{post.authorName}</Link>
                                            </div>
                                        </div>
                                        <div className="col-lg-9">
                                            <div className="post-wrap">
                                                <PostItem post={post} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                    {
                        loading ? <ScrollLoader/> : null
                    }
            </div>
        </div>
    )
};

export default Posts;