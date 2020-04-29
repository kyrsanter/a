import React from "react";
import './profile.css';
import ProfileList from "./profile-info";
import ProfileDropList from "./profile-drop-list";
import ProfilePosts from "./profile-posts";
import ScrollLoader from "../scroll-loader/scroll-loader";

const Profile = (props) => {
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
    let {user: {address, company, id, admin, ...otherData}} = props;
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
                            !posts.length !== 0 ? (
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
