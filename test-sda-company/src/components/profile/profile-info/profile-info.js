import React from "react";

const ProfileList = (props) => {
    if (!props.data) {
        return null
    }
    let {data} = props;
    let list = Object.keys(data).map( (key, i) => {
        if (key === 'website') {
            return (
                <li key={i}>{key.charAt(0).toLocaleUpperCase()}{key.slice(1)}: <a href={data[key]}>{data[key]}</a></li>
            )
        }
        return (
            <li key={i}>{key.charAt(0).toLocaleUpperCase()}{key.slice(1)}: {data[key]}</li>
        )
    });
    return (
        <div className="profile-info">
            <ul>
                {list}
            </ul>
        </div>
    )
};

export default ProfileList;