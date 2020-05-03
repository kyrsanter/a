import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {getUserThunk} from "../../actions/users.actions";
import Profile from "../../components/profile";
import {clearUserPosts, getUsersPostsThunk} from "../../actions/posts.actions";
import {useHistory} from 'react-router-dom'
import {RootStateType} from "../../store/store";
import {DispatchPropsType, PropsType, StatePropsType} from "./types";
import { History } from 'history';

const ProfileContainer: FC<PropsType> = (props) => {
    let abortController = new AbortController();
    let {id, limit, skip, hasMore, userPosts} = props;
    let history = useHistory<History>();

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        props.getCurrentUser(id, history);
        // @ts-ignore
        props.getUSerPosts({id, limit, skip, signal: abortController.signal}, 'user', userPosts.length, history);
        return () => {
            abortController.abort();
            props.clearUserPosts();
        }
    }, [id]);

    const loadMore = () => {
        if (hasMore) {
            // @ts-ignore
            props.getUSerPosts({id, limit, skip, signal: abortController.signal}, 'user', userPosts.length, history)
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

const mapStateToProps = (state: RootStateType): StatePropsType => {
    return {
        hasMore: state.post.userPosts.hasMore,
        limit: state.post.userPosts.limit,
        skip: state.post.userPosts.skip,
        userPosts: state.post.userPosts.posts,
        fetchingPosts: state.post.userPosts.loading,
        fetchingCurrentUser: state.user.fetchingCurrentUser,
        currentUser: state.user.currentUser,
    }
};

const mapDispathToProps = (dispatch: any): DispatchPropsType => {
    return {
        clearUserPosts: () => dispatch(clearUserPosts()),
        getUSerPosts: (params, path, postsLength, history) => dispatch(getUsersPostsThunk(params, path, postsLength, history)),
        getCurrentUser: (id, history) => dispatch(getUserThunk(id, history))
    }
};



export default connect<StatePropsType, DispatchPropsType, {}, RootStateType>(mapStateToProps, mapDispathToProps)(ProfileContainer);

