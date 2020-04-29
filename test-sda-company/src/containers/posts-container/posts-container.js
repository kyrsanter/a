import React, {useEffect} from "react";
import {connect} from 'react-redux';
import {clearAllPosts, getPostsThunk} from "../../actions/posts.actions";
import Posts from "../../components/posts";
import {useHistory} from 'react-router-dom';

const PostsContainer = (props) => {
    let {skip, limit, allPosts, hasMore, loading} = props;
    let history = useHistory();
    useEffect(() => {
        props.getAllPosts({limit, skip}, '', allPosts.length, history);
        return () => props.clearAllPosts();
    }, []);

    let loadMore = () => {
        if (hasMore) {
            props.getAllPosts({limit, skip}, '', allPosts.length)
        }
    };

    return <Posts posts={allPosts} loadMore={loadMore} loading={loading}/>
};

const mapStateToProps = (state) => {
    return {
        limit: state.post.allPosts.limit,
        skip: state.post.allPosts.skip,
        allPosts: state.post.allPosts.posts,
        hasMore: state.post.allPosts.hasMore,
        loading: state.post.allPosts.loading
    }
};

const mapDispathToProps = (dispatch) => {
    return {
        clearAllPosts: () => dispatch(clearAllPosts()),
        getAllPosts: (params, path, postsLength, history) => dispatch(getPostsThunk(params, path, postsLength, history))
    }
}

export default connect(mapStateToProps, mapDispathToProps)(PostsContainer)