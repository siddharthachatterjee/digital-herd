import React, { useContext, useEffect } from "react";
import MintToken from "../components/MintToken";
import { Web3Context } from "../context/Web3Context";
import { art, backdrops } from "../core/vars";


export default function Mint() {
    const {address, connect} = useContext(Web3Context);

    useEffect(() => {   
        connect();
    }, [])
    return address === "0x8767810706336e2471444e260dA71D5cB60e09aC" && (
        <>
        {art.map((animal, i) => (
            backdrops.map((bd, j) => (
                <MintToken animal = {animal} backdrop = {bd} key = {i + '' + j} i = {i * art.length + j} />
            ))
        ))} 
        </>
    );
}