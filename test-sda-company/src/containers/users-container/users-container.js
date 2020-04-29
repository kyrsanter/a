import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {clearUsersActionCreator, getUsersThunk} from "../../actions/users.actions.tsx";
import Users from "../../components/users/users";
import {useHistory} from 'react-router-dom';

const UsersContainer = (props) => {
    let {users, fetchingUsers, limit, skip, hasMore, clearUsers} = props;
    let history = useHistory();
    useEffect(() => {
        if (users.length === 0) {
            props.getUsers({limit, skip}, users.length, history);
        }
        return () => clearUsers()
    }, []);

    let loadMore = () => {
        if (hasMore) {
            props.getUsers({limit, skip}, users.length, history);
        }
    };
    return <Users
                users={users}
                loading={fetchingUsers}
                limit={limit}
                skip={skip}
                loadMore={loadMore}
                />
};

const mapStateToProps = (state) => {
    return {
        limit: state.user.limit,
        skip: state.user.skip,
        users: state.user.users,
        fetchingUsers: state.user.fetchingUsers,
        hasMore: state.user.hasMore,
    }
};

const mapDispathToProps = (dispatch) => {
    return {
        getUsers: (params, counter, history) => dispatch(getUsersThunk(params, counter, history)),
        clearUsers: () => dispatch(clearUsersActionCreator())
    }
};

export default connect(mapStateToProps, mapDispathToProps)(UsersContainer)