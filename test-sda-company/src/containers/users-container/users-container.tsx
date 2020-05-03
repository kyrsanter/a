import React, {FC, useEffect} from 'react';
import {connect} from "react-redux";
import {clearUsersActionCreator, getUsersThunk} from "../../actions/users.actions";
import Users from "../../components/users/users";
import {useHistory} from 'react-router-dom';
import {RootStateType} from "../../store/store";
import {DispatchPropsType, PropsType, StatePropsType} from "./types";

const UsersContainer: FC<PropsType> = (props) => {
    let abortController = new AbortController();
    let {users, fetchingUsers, limit, skip, hasMore, clearUsers} = props;
    let history = useHistory();

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        props.getUsers({limit, skip, signal: abortController.signal}, users.length, history);
        return () => {
            abortController.abort();
            clearUsers()
        }
    }, []);

    let loadMore = () => {
        if (hasMore) {
            props.getUsers({limit, skip, signal: abortController.signal}, users.length , history);
        }
    };
    return <Users
                users={users}
                loading={fetchingUsers}
                loadMore={loadMore}
                />
};

const mapStateToProps = (state: RootStateType): StatePropsType => {
    return {
        limit: state.user.limit,
        skip: state.user.skip,
        users: state.user.users,
        fetchingUsers: state.user.fetchingUsers,
        hasMore: state.user.hasMore,
    }
};

const mapDispathToProps = (dispatch: any): DispatchPropsType => {
    return {
        getUsers: (params, counter, history) => dispatch(getUsersThunk(params, counter, history)),
        clearUsers: () => dispatch(clearUsersActionCreator())
    }
};

export default connect(mapStateToProps, mapDispathToProps)(UsersContainer)


