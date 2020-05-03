import React, {FC, useEffect} from "react";
import {connect} from 'react-redux';
import {clearAllPosts, getAllPostsThunk} from "../../actions/posts.actions";
import Posts from "../../components/posts";
import {useHistory} from 'react-router-dom';
import {RequestParamsType} from "../../types";
import {RootStateType} from "../../store/store";
import {DispatchPropsType, PropsType, StatePropsType} from "./types";
import { History } from 'history';

const PostsContainer: FC<PropsType> = (props) => {
    let counter;
    let abortConroller = new AbortController();
    let {skip, limit, allPosts, hasMore, loading} = props;
    let history = useHistory<History>();

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        if (allPosts) {
            counter = allPosts.length
        }
        else {
            counter = 0
        }
        props.getAllPosts({limit, skip, signal: abortConroller.signal}, null, counter, history);
        return () => {
            abortConroller.abort();
            props.clearAllPosts();
        }
    }, []);

    let loadMore = () => {
        if (hasMore) {
            if (allPosts) {
                counter = allPosts.length
            }
            else {
                counter = 0
            }
            props.getAllPosts({limit, skip, signal: abortConroller.signal}, null, counter, history)
        }
    };

    return <Posts posts={allPosts} loadMore={loadMore} loading={loading}/>
};

const mapStateToProps = (state: RootStateType): StatePropsType => {
    return {
        limit: state.post.allPosts.limit,
        skip: state.post.allPosts.skip,
        allPosts: state.post.allPosts.posts,
        hasMore: state.post.allPosts.hasMore,
        loading: state.post.allPosts.loading
    }
};

const mapDispathToProps = (dispatch: any): DispatchPropsType => {
    return {
        clearAllPosts: () => dispatch(clearAllPosts()),
        getAllPosts: (params: RequestParamsType, path: null, postsLength: number, history: any) => dispatch(getAllPostsThunk(params, path, postsLength, history))
    }
};

export default connect<StatePropsType, DispatchPropsType, {}, RootStateType>(mapStateToProps, mapDispathToProps)(PostsContainer)

