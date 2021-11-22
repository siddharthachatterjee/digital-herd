import React, { useContext, useEffect, useRef, useState } from "react";
import { Web3Context } from "../context/Web3Context";
import { ETH } from "../core/vars";


import "../styles/animal-card.css";
import AnimalImage from "./AnimalImage";

export default function AnimalCard(props: {id: number}) {
    const {contract, address} = useContext(Web3Context);
    const [animal, setAnimal] = useState<any>({});
    const [owner, setOwner] = useState("");
    const canvasRef = useRef(null);

    function buy() {
        contract.methods.purchaseToken(props.id).send({from: address, value: animal.price ||  ETH * 0.01});
    }
    useEffect(() => {   
        if (contract) {
            contract.methods.tokenURI(props.id).call({from: address})
                .then((uri: any) => {
                    console.log(uri);
                    setAnimal(JSON.parse(uri));
                    contract.methods.ownerOf(props.id).call({from: address})
                        .then((res:string) => {
                            console.log(res);
                            setOwner(res);
                        })
                });
        }   
    }, [contract])
    return(
        
        <div className = "animal-card">
            <div className = "animal-card-img" style = {{backgroundImage: `url(${animal.image})`}}>
                {/* <AnimalImage canvasRef = {canvasRef} image = {"/nfts/elephant.png"} /> */}
            </div>
            <div className = "basic-info">
                <div style = {{textAlign: "center", fontWeight: "bold"}}>
                    {animal.name}
                </div>
                <hr />
                <div>
                    Species: {animal.species}
                </div>
                <div>
                    {(address !== owner) &&
                    <div>
                        <div>
                            <i className="ri-price-tag-3-line"></i> {animal.price || 0.01}<span className="iconify" data-icon="logos:ethereum"></span>
                        </div>
                        <button onClick = {buy} className = "call-to-action primary" style = {{width: "100%", display: "block", margin: 0}}>
                            Buy 
                        </button>
                    </div>}
                </div>
            </div>
        </div>
    )
}