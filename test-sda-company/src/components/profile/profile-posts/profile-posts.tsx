import React, {FC, useCallback, useRef} from "react";
import './profile-posts.css';
import PostItem from "../../post-item";
import ScrollLoader from "../../scroll-loader/scroll-loader";
import {_AllTypes} from "../../../types";
import {PropsType} from "./types";

const ProfilePosts: FC<PropsType> = ({posts, loadMore, loading}) => {

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
        observe.current = new IntersectionObserver((entries:  Array<IntersectionObserverEntry>) => {
            if (entries[0].isIntersecting && !loading) {
                loadMore()
            }
        }, options);
        if (node && observe.current) {
            observe.current.observe(node)
        }
    });

    let postsList = posts ? posts.map( (post, i) => {
        if (i === posts.length - 1) {
            return (
                <div ref={lastElement} key={post.id} className="post-wrap">
                    <PostItem post={post} />
                </div>
            )
        }
        else {
            return (
                <div key={post.id} className="post-wrap">
                    <PostItem post={post} />
                </div>
            )
        }
    }) : null;

    return (
        <div className='profile-posts'>
            {
                postsList
            }
            {
                loading ? <ScrollLoader/> : null
            }
        </div>
    )
};

export default ProfilePosts;