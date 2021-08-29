import React, { useContext } from "react";
import { Web3Context } from "../context/Web3Context";

import "../styles/landing-page.css";
import Modal from "./Modal";

export default function LandingPage() {
    const {connect, loading, error} = useContext(Web3Context);
    return (
        <div id = "landing-page">
            {(loading) && (
                <Modal />
            )}
            <div className = "content">
                <header>
                    <div className = "heading-text">
                        <h1>
                            Buy NFTs. Fight for Animal Conservation.
                        </h1>
                        <br />
                        <p>
                            Build your zoo to show off to others, support animals, and learn.
                        </p>
                        <br />
                        <div className = "buttons">
                            <button className = "call-to-action primary" onClick = {connect/*() => window.location.pathname = "/sign-up"*/}>
                                Sign In using an Ethereum wallet
                            </button>

                        </div>
                        {error && !loading &&  (
                            <div style = {{color: "red"}}>
                                ERROR: {error.message}
                            </div>
                        )}
                    </div>
                </header>
                <div className = "images">
                    <div id = "panda">
                        <img src = "panda.jpeg" />
                    </div>
                    <div id = "tiger">
                        <img src = "tiger.jpeg" />
                    </div>
                    <div id = "elephant">
                        <img  src = "elephant.jpeg" />
                    </div>
                </div>
            </div>
        </div>
    );
}