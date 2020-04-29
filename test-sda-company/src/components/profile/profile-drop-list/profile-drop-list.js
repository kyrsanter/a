import React from "react";

const ProfileDropList = (props) => {
    if (!props.data) {
        return null
    }
    let {data, title} = props;
    let list = Object.keys(data).map( (key, i) => {
        if (key === 'geo') {
            return null
        }
        return (
            <li key={i}>
                {key.charAt(0).toLocaleUpperCase()}{key.slice(1)}: {data[key]}
            </li>
        )
    });

    return (
        <div className='profile-droped'>
            <div className="profile-droped-title">
                <input type="checkbox" id={title} defaultChecked/>
                <label htmlFor={title}>{title}</label>

                <ul className="profile-droped-list">
                    {list}
                </ul>
            </div>
        </div>
    )
};

export default ProfileDropList;