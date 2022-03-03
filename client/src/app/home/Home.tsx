import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import LandingPage from "./LandingPage";
import Section from "./Section";
import homePageContent from "../../core/homePageContent";
import { Web3Context } from "../../context/Web3Context";


export default function Home(): JSX.Element {
    const {error, loading} = useContext(Web3Context);
    const history = useHistory();
    const backgrounds = ["var(--theme-green)", "var(--theme-background)"];
    const colors = ["var(--theme-complementary-contrast)", "var(--theme-contrast)"]
    // useEffect(() => {
    //     if (localStorage.getItem("address") !== null) {
    //         window.location.pathname = "/profile";
    //       // connect().then(() => window.location.pathname = "/profile"); 
    //     }
    // }, [])
    return (
        <>
        <LandingPage />
        {homePageContent.sections.map((section, i) => (
            <Section {...section} key = {i} background = {backgrounds[i % backgrounds.length]} color = {colors[i % colors.length]} />
        ))}
        <div className = "background-container"style = {{textAlign: "center", height: "max-content", padding: "5em 0"}}>
            <h1> Build Your Herd to Save the World! </h1>
            <button onClick = {() => history.push("/sign-up")} className = "call-to-action primary">
                Sign Up
            </button>
            {error && !loading &&  (
                <div style = {{color: "red"}}>
                    ERROR: {error.message}
                </div>
            )}
            <div style = {{fontSize: 24}}>
                <a href = "https://twitter.com/DigitalHerdNFT"> Follow us on twitter </a>
                <br />
                <br />
                <a href = "https://discord.gg/T2etBanX"> Join our discord </a>
                <br />
                Copyright (c) Siddhartha Chatterjee 2022
            </div>
        </div>
        </>
    )
}