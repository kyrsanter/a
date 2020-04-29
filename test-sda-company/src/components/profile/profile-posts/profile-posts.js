import React, {useCallback, useRef} from "react";
import './profile-posts.css';
import PostItem from "../../post-item";
import ScrollLoader from "../../scroll-loader/scroll-loader";

const ProfilePosts = ({posts, loadMore, loading}) => {

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
        <div className='profile-posts'>
            {
                posts.map( (post, i) => {
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
                })
            }
            {
                loading ? <ScrollLoader/> : null
            }
        </div>
    )
};

export default ProfilePosts;