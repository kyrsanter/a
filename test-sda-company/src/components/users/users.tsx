import React, {FC, useCallback, useRef} from "react";
import UserListItem from "../../components/user-list-item";
import ScrollLoader from "../scroll-loader/scroll-loader";
import {_AllTypes, UserListItemType} from "../../types";

type PropsType = {
    users: [] | Array<UserListItemType>
    loading: boolean
    loadMore: () => void
}


const Users: FC<PropsType> = (props) => {

    let {users, loading, loadMore} = props;

    let options: IntersectionObserverInit = {
        root: null,
        threshold: 1
    };

    let observe = useRef<_AllTypes>();
    // @ts-ignore
    let lastElement = useCallback((node: HTMLDivElement) => {
        if (observe.current) {
            observe.current.disconnect()
        }
        observe.current = new IntersectionObserver((entries: Array<IntersectionObserverEntry>) => {
            if (entries[0].isIntersecting && !loading) {
                loadMore()
            }
        }, options);
        if (node && observe.current) {
            observe.current.observe(node)
        }
    });

    //@ts-ignore
    let usersList = users.map((user: UserListItemType, i: number) => {

        if (users && i === users.length - 1) {
            return (
                <div ref={lastElement} key={user.id} className="col-lg-8">
                    <UserListItem {...user}/>
                </div>
            )
        }
        else {
            return (
                <div key={user.id} className="col-lg-8">
                    <UserListItem {...user}/>
                </div>
            )
        }
    });

    return(
        <div className="user-page">
            <div className="container">
                <div className="row justify-content-center">
                    {
                        usersList
                    }
                    {
                        loading ? (<div className="col-lg-8"><ScrollLoader/></div>) : null
                    }
                </div>
            </div>
        </div>
    )
};

export default Users;