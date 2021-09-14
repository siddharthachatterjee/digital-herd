import React from "react";

import "../styles/modal.css";


export default function Modal(props: {children?: any}) {
    return (
        <div className = "modal-container">
            {props.children && <div className = "modal">
                {props.children}
            </div>}
        </div>
    )
}