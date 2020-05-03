import React, {FC} from "react";
import './profile.css';
import ProfileList from "./profile-info";
import ProfileDropList from "./profile-drop-list";
import ProfilePosts from "./profile-posts";
import ScrollLoader from "../scroll-loader/scroll-loader";
import {PropsType} from "./types";

const Profile: FC<PropsType> = (props) => {
    let {user, loading, posts, fetchingPosts, loadMore} = props;
    if (loading || user === null) {
        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10">
                            <ScrollLoader/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    //@ts-ignore
    let {user: {address, company, admin, ...otherData}} = props;
    return (
        <div className="profile">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <ProfileList data={otherData}/>
                        <ProfileDropList data={address} title='Address'/>
                        <ProfileDropList data={company} title='Company'/>
                    </div>
                    <div className="col-lg-8">
                        {
                            posts ? (
                                <ProfilePosts posts={posts} loadMore={loadMore} loading={fetchingPosts}/>
                            ) : <ScrollLoader/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;
