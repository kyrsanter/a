import React, {FC} from "react";
import './user-list-item.css'
import {Link} from "react-router-dom";
import {PropsType} from "./types";

const UserListItem: FC<PropsType> = (props) => {
    let {name, phone, username, email, id} = props;
    return (
        <div className="user-list-item">
            <div>
                <p className='title'>Name: </p>
                <h2 className='content'>{name} ({username})</h2>
            </div>
            <div>
                <p className='title'>Email:</p>
                <h3 className='content'>{email}</h3>
            </div>
            <div>
                <p className='title'>Phone:</p>
                <a className='content' href={`tel:${phone}`}>{phone}</a>
            </div>

            <Link className='btn btn-primary' to={`/users/${id}`}>Watch profile</Link>
        </div>
    )
};

export default UserListItem;