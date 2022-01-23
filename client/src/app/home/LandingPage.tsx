import React, { useContext } from "react";
import { useHistory } from "react-router";
import homePageContent from "../../core/homePageContent";
//import {useHistory} from "react-router-dom";
import { Web3Context } from "../../context/Web3Context";

import "../styles/landing-page.css";
import Modal from "../../components/Modal";

export default function LandingPage() {
    const {connect, loading, error} = useContext(Web3Context);
    const history = useHistory();
    return (
        <div id = "landing-page">
            <div className = "content">
                <header>
                    <div className = "heading-text">
                        <h1>
                            {homePageContent.heading}
                        </h1>
                        <br />
                        <p>
                            {homePageContent.subHeading}
                        </p>
                        <br />
                        <div className = "buttons">
                            <button className = "call-to-action primary" onClick = {() => history.push("/sign-up")}>
                                Get Started
                            </button>
                            <button className = "call-to-action secondary" onClick = {() => history.push("/explore")}>
                                Explore Marketplace
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