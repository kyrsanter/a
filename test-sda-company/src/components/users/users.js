import React, {useCallback, useRef} from "react";
import UserListItem from "../../components/user-list-item";
import ScrollLoader from "../scroll-loader/scroll-loader";

const Users = (props) => {
    let {users, loading, loadMore} = props;

    let observe = useRef();
    let lastElement = useCallback((node) => {
        if (observe.current) {
            observe.current.disconnect();
        }
        observe.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading) {
                loadMore()
            }
        }, {root: null, treshold: 1});
        if (node) {
            observe.current.observe(node)
        }
    });

    return(
        <div className="user-page">
            <div className="container">
                <div className="row justify-content-center">
                    {
                        users.map( (u, i) => {
                            if (i === users.length - 1) {
                                return (
                                    <div ref={lastElement} key={u.id} className="col-lg-8">
                                        <UserListItem {...u}/>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div key={u.id} className="col-lg-8">
                                        <UserListItem {...u}/>
                                    </div>
                                )
                            }
                        })
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