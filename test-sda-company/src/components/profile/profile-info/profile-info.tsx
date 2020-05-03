import React, {FC} from "react";
import {ProfileInfoType} from "./types";

const ProfileList: FC<ProfileInfoType> = (props) => {
    if (!props.data) {
        return null;
    }
    let {data} = props;
    let list = Object.keys(data).map( (key, i) => {
        if (key === 'website') {
            return (
                //@ts-ignore
                <li key={i}>{key.charAt(0).toLocaleUpperCase()}{key.slice(1)}: <a href={data[key]}>{data[key]}</a></li>
            )
        }
        return (
            //@ts-ignore
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