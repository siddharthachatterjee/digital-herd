import React from "react";
import { useHistory } from "react-router";

import "../styles/navbar.css"

export default function Navbar() {
    const history = useHistory();
    return (
        <nav id = "navbar">
            <div id = "logo" onClick = {() => history.push("/")}>
                DigitalHerd
            </div>
            <div id = "links">
                <div onClick = {() => history.push("/explore")}>
                    Marketplace 
                </div>
            </div>
        </nav>
    )
}