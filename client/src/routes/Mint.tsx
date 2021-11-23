import React from "react";
import MintToken from "../components/MintToken";
import { art, backdrops } from "../core/vars";


export default function Mint() {
    return (
        <>
        {art.map((animal, i) => (
            backdrops.map((bd, j) => (
                <MintToken animal = {animal} backdrop = {bd} key = {i + '' + j} i = {i * art.length + j} />
            ))
        ))} 
        </>
    );
}