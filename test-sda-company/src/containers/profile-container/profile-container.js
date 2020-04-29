import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getUserThunk} from "../../actions/users.actions.tsx";
import Profile from "../../components/profile";
import {clearUserPosts, getPostsThunk} from "../../actions/posts.actions";
import {useHistory} from 'react-router-dom'

const ProfileContainer = (props) => {
    let {id, limit, skip, hasMore, userPosts} = props;
    let history = useHistory();
    useEffect(() => {
        props.getCurrentUser(id, history);
        if (props.userPosts.length === 0 || props.currentUser.id !== id) {
            props.getUSerPosts({id, limit, skip}, 'user', userPosts.length, history);
        }
        return () => {
            props.clearUserPosts()
        }
    }, [id]);

    const loadMore = () => {
        if (hasMore) {
            props.getUSerPosts({id, limit, skip}, 'user', userPosts.length, history)
        }
    };

    return <Profile
                user={props.currentUser}
                loading={props.fetchingCurrentUser}
                posts={props.userPosts}
                fetchingPosts={props.fetchingPosts}
                loadMore={loadMore}
                />
};

const mapStateToProps = (state) => {
    return {
        hasMore: state.post.userPosts.hasMore,
        limit: state.post.userPosts.limit,
        skip: state.post.userPosts.skip,
        userPosts: state.post.userPosts.posts,
        fetchingPosts: state.post.userPosts.loading,
        fetchingCurrentUser: state.user.fetchingCurrentUser,
        currentUser: state.user.currentUser
    }
};

const mapDispathToProps = (dispatch) => {
    return {
        clearUserPosts: () => dispatch(clearUserPosts()),
        getUSerPosts: (params, path, postsLength, history) => dispatch(getPostsThunk(params, path, postsLength, history)),
        getCurrentUser: (id, history) => dispatch(getUserThunk(id, history))
    }
};


export default connect(mapStateToProps, mapDispathToProps)(ProfileContainer);