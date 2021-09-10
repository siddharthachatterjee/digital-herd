import React from "react";

import "../styles/navbar.css"

export default function Navbar() {
    return (
        <nav id = "navbar">
            <div id = "logo" onClick = {() => window.location.pathname = "/"}>
                DigitalHerd
            </div>
            <div id = "links">
                <div onClick = {() => window.location.pathname = "/explore"}>
                    Explore
                </div>
            </div>
        </nav>
    )
}