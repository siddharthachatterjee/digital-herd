import React, { useContext, useEffect, useRef, useState } from "react";
import { IPFSContext } from "../context/IPFSContext";
import { Web3Context } from "../context/Web3Context";

import { ETH, Web3ContextValues } from "../core";


import "../styles/animal-card.css";
import AnimalImage from "./AnimalImage";

import { useHistory } from "react-router";

export default function AnimalCard(props: {id: number}) {
    const {contract, address, networkId, contractAddress}: Web3ContextValues = useContext(Web3Context);
    const [animal, setAnimal] = useState<any>({});
    const [owner, setOwner] = useState("");
    const [imgData, setImgData] = useState("");
   // const {ipfs} = useContext(IPFSContext);
    const [loaded, setLoaded] = useState(false);
    const history = useHistory();

    //const canvasRef = useRef(null);

    function buy() {
        if (address)
            contract.methods.purchaseToken(props.id).send({from: address, value: animal.price ||  ETH * 0.01});
        else 
            history.push("/sign-up?redirect=/explore")
    }
    useEffect(() => {   
        if (contract) {
            contract.methods.tokenURI(props.id).call({from: address})
                .then((uri: any) => {
                    console.log(uri);
                    fetch(uri)
                        .then(data => data.json())
                        .then(json => setAnimal(json))
                   // setAnimal(JSON.parse(uri));
                    contract.methods.ownerOf(props.id).call({from: address})
                        .then((res:string) => {
                            console.log(res);
                            setOwner(res);
                        })
                });
        }   
    }, [contract]);

    useEffect(() => {
        if (animal && animal.image) {
            (async() => {
                // fetch(animal.image)
                //     .then(res => console.log(res.text()))
                // ipfs.files.cat("QmS3GTCi2LyYZMWvd61wCAFa5nVsJmdSZzSXb2o9DGUAxd", (err:string, str:string) => {
                //     console.log(str);
                // })
            //     const res = await fetch(animal.image, {
            //         headers: {
            //             'Content-Type': 'text/plain'
            //         }
            //     });
            //     const text = await res.text();
            //   //  console.log(text);
            //     setImgData(text);
            //   console.log(animal.image)

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
    }, [animal])
    return(
        
        <div className = "animal-card">
            {loaded}
            <div className = "animal-card-img" >
               
                {/* {imgData} */}
                <img src = {animal.image}  />
                {/* <AnimalImage canvasRef = {canvasRef} image = {"/nfts/elephant.png"} /> */}
            </div>
            {true? <div className = "basic-info">
                <div style = {{textAlign: "center", fontWeight: "bold"}}>
                    Animal #{props.id}
                </div>
                <hr />
                <div>
                    Species: {animal.species}
                </div>
                <div>
                    <a href = {`https://ropsten.etherscan.io/token/${contractAddress.toLowerCase()}?a=${props.id}`}> View on Etherscan </a>
                </div>
                <div>
                    {(address !== owner) &&
                    <div className = "info">
                        <div>
                            <i className="ri-price-tag-3-line"></i> {animal.price || 0.01}<span className="iconify" data-icon="logos:ethereum"> ETH </span>
                        </div>
                     
                        <br />
                        <button title = "Purchase Token" onClick = {buy} className = "call-to-action primary" style = {{width: "100%", display: "block", margin: 0}}>
                            Buy 
                        </button>
                    </div>}
                </div>
            </div> : 
            <div>
                Loading, please wait a few moments.
            </div>}
        </div>
    )
}