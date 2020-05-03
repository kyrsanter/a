import React, {FC} from "react";
import './post-item.css';
import {PropsType} from "./types";

const PostItem: FC<PropsType> = ({post}) => {
    return (
        <div className="post-item">
            {
                post.canBeModify ? <p className='edit-handler'>Edit</p> : null
            }
            <h3 className="post-title">
                {post.title.charAt(0).toLocaleUpperCase()}
                {post.title.slice(1)}
            </h3>
            <p className="post-body">
                {post.body.charAt(0).toLocaleUpperCase()}
                {post.body.slice(1)}
            </p>
            {
                !post.canBeModify ? (
                    <div className="post-reaction">
                        <p>Like</p>
                        <p>Dislike</p>
                    </div>) : null
            }
        </div>
    )
};

export default PostItem;