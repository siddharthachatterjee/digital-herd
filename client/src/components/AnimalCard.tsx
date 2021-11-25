import React, { useContext, useEffect, useRef, useState } from "react";
import { IPFSContext } from "../context/IPFSContext";
import { Web3Context } from "../context/Web3Context";

import { ETH, Web3ContextValues } from "../core/vars";


import "../styles/animal-card.css";
import AnimalImage from "./AnimalImage";
import AnimalsCollectibleContract from "../contracts/AnimalsCollectible.json";

export default function AnimalCard(props: {id: number}) {
    const {contract, address, networkId}: Web3ContextValues = useContext(Web3Context);
    const [animal, setAnimal] = useState<any>({});
    const [owner, setOwner] = useState("");
    const [imgData, setImgData] = useState("");
    const {ipfs} = useContext(IPFSContext);
    const contractNetwork: {[K: number]: any} = {...AnimalsCollectibleContract.networks};

    //const canvasRef = useRef(null);

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
    }, [contract]);

    useEffect(() => {
        if (ipfs && animal && animal.image) {
            (async() => {
                const res = await fetch(animal.image, {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                });
                const text = await res.text();
                setImgData(text);
            //     console.log(animal.image)

            //     const stream = (ipfs.cat(animal.image));
            //    // console.log(stream);
            //     let str = ''
            //     for await (const chunk of stream) {
                   
            //             str += chunk.toString();
            //         //}
            //       //  setImgData(prev => prev + chunk.toString());
            //     }
            //     console.log("str: " + str);
            //     setImgData(str);
            })();
        }
    }, [animal, ipfs])
    return(
        
        <div className = "animal-card">
            <div className = "animal-card-img" >
                {/* {imgData} */}
                <img src = {imgData} />
                {/* <AnimalImage canvasRef = {canvasRef} image = {"/nfts/elephant.png"} /> */}
            </div>
            <div className = "basic-info">
                <div style = {{textAlign: "center", fontWeight: "bold"}}>
                    Animal #{props.id}
                </div>
                <hr />
                <div>
                    Species: {animal.species}
                </div>
                <div>
                    <a href = {`https://ropsten.etherscan.io/token/${contractNetwork[networkId]!.address!.toLowerCase()}?a=${props.id}`}> View on Etherscan </a>
                </div>
                <div>
                    {(address !== owner) &&
                    <div>
                        <div>
                            <i className="ri-price-tag-3-line"></i> {animal.price || 0.01}<span className="iconify" data-icon="logos:ethereum"></span>
                        </div>
                     
                        <br />
                        <button title = "Purchase Token" onClick = {buy} className = "call-to-action primary" style = {{width: "100%", display: "block", margin: 0}}>
                            Buy 
                        </button>
                    </div>}
                </div>
            </div>
        </div>
    )
}