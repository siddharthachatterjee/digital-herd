import React, { useContext, useEffect } from "react";
import LandingPage from "../components/LandingPage";
import { Web3Context } from "../context/Web3Context";


export default function Home(): JSX.Element {
    const {connect} = useContext(Web3Context);
    useEffect(() => {
        if (localStorage.getItem("address") !== null) {
            window.location.pathname = "/profile";
          // connect().then(() => window.location.pathname = "/profile"); 
        }
    }, [])
    return (
        <>
        <LandingPage />
        </>
    )
}