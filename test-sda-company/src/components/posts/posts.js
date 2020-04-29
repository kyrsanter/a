import React, {useCallback, useRef} from "react";
import './posts.css';
import PostItem from "../post-item";
import {Link} from "react-router-dom";
import ScrollLoader from "../scroll-loader/scroll-loader";

const Posts = ({posts, loadMore, loading}) => {


    let observe = useRef();

    let lastElement = useCallback( (node) => {
        if (observe.current) {
            observe.current.disconnect();
        }
        observe.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading) {
                loadMore()
            }
        }, {
            root: null,
            threshold: 0.2
        });
        if (node) {
            observe.current.observe(node)
        }
    });
    return (
        <div className="posts">
            <div className="container">
                    {
                        posts.map( (post, i) => {
                            if (i === posts.length - 1) {
                                return (
                                    <div className='row' key={`${post.id}-${post.userId}`}>
                                        <div className="col-lg-3">
                                            <div className="div">
                                                <p>Author:</p>
                                                <Link className='btn btn-success' to={`/users/${post.userId}`}>{post.authorName}</Link>
                                            </div>
                                        </div>
                                        <div key={post.id} className="col-lg-9">
                                            <div ref={lastElement} className="post-wrap">
                                                <PostItem post={post} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div className='row' key={`${post.id}-${post.userId}`}>
                                        <div className="col-lg-3">
                                            <div className="div">
                                                <p>Author:</p>
                                                <Link className='btn btn-success' to={`/users/${post.userId}`}>{post.authorName}</Link>
                                            </div>
                                        </div>
                                        <div key={post.id} className="col-lg-9">
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