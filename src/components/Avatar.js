import React from "react";
import { Image } from "@fluentui/react"

const avatarStyles = {
    root : {
        borderRadius: "50%",
        margin: "0 8px"
    }
}

function Avatar(props) {
    return (
        <Image styles={avatarStyles} src={props.src} width={props.side} length={props.side}/>
    )    
}

export default Avatar;