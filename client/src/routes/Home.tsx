import React, { useContext } from "react";
import LandingPage from "../components/LandingPage";
import Section from "../components/Section";
import homePageContent from "../content/homePageContent";
import { Web3Context } from "../context/Web3Context";


export default function Home(): JSX.Element {
    const {error, loading} = useContext(Web3Context);
    const backgrounds = ["var(--theme-complementary)", "var(--theme-background)"]
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
            <Section {...section} key = {i} background = {backgrounds[i % backgrounds.length]} />
        ))}
        <div className = "background-container"style = {{textAlign: "center", height: "max-content", padding: "5em 0"}}>
            <h1> Build Your Herd to Save the World! </h1>
            <button onClick = {() => window.location.pathname = "/sign-up"} className = "call-to-action primary">
                Sign Up
            </button>
            {error && !loading &&  (
                <div style = {{color: "red"}}>
                    ERROR: {error.message}
                </div>
            )}
        </div>
        </>
    )
}