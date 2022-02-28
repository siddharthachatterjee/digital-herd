import React, { useContext, useEffect, useRef, useState } from "react";
import { IPFSContext } from "../../../context/IPFSContext";
import { Web3Context } from "../../../context/Web3Context";

import { ETH, Web3ContextValues } from "../../../core";


import "./animal-card.css";
import AnimalImage from "./AnimalImage";

import { useHistory } from "react-router";

interface AnimalCardProps {
    id: number;
    onLoad?: (obj: any) => void;
    onFetch?: (obj: any) => void;
    dropped?: number;
}

export default function AnimalCard(props: AnimalCardProps) {
    const {contract, address, networkId, contractAddress}: Web3ContextValues = useContext(Web3Context);
    const [animal, setAnimal] = useState<any>({});
    const [owner, setOwner] = useState("");
    const [imgData, setImgData] = useState("");
    const {ipfs} = useContext(IPFSContext);
    const [loaded, setLoaded] = useState(false);
    const history = useHistory();

    //const canvasRef = useRef(null);

    function buy() {
        if (address  && address !== "0x2EcFfb31E2EA4a2b59cb131820c2EC29C3Bcb65C")
            contract.methods.purchaseToken(props.id).send({from: address, value: ETH * animal.price ||  ETH * 0.05});
        else 
            history.push("/sign-up?redirect=/explore")
    }

    async function getIPFSImage(uri: string) {
        const chunks: any[] = [];
        const stream = ipfs.cat(JSON.parse(uri).image.split("https://ipfs.io/ipfs/")[1]);
        // setAnimal(JSON.parse(uri));

        for await (const chunk of stream) {
            chunks.push(...chunk);
        }
        console.log(`${props.id} image fetched`)
        //   if (chunks)
        const data = "data:image/png;base64," + Buffer.from(chunks).toString("base64");
        props.onLoad!(animal);
        setAnimal((prev: any) => ({
            ...prev,
          //  ...JSON.parse(uri),
            image: data
        }));
    }
    useEffect(() => {   
        if (contract && ipfs) {
            (async () => {
                // if (localStorage.getItem(`nft-${props.id}`)) {
                //     setAnimal({
                //         ...JSON.parse(localStorage.getItem(`nft-${props.id}`)!),
                      
                //     })

                //     getIPFSImage(localStorage.getItem(`nft-${props.id}`)!);
                   
                // } else {
                
                    const uri:string =  localStorage.getItem(`nft-${props.id}`) || await contract.methods.tokenURI(props.id).call({from: address});
                    localStorage.setItem(`nft-${props.id}`, uri);
                    //if (uri && uri.split("https://ipfs.io/ipfs/")[1]) {
                     //   .then((uri: any) => {
                          //console.log(uri);
                            
                          // localStorage.setItem(`nft-${props.id}`, data);
                    
                          if (props.onFetch)
                           props.onFetch!({...JSON.parse(uri)});
                           setAnimal(() => ({
                               ...JSON.parse(uri),
                               
                           }));
                            getIPFSImage(uri);
    
                            // fetch(uri)
                            //     .then(data => data.json())
                            //     .then(json => setAnimal(json))
                           // setAnimal(JSON.parse(uri));
                            contract.methods.ownerOf(props.id).call({from: address})
                                .then((res:string) => {
                                   // console.log(res);
                                    setOwner(res);
                                })
                         //   localStorage.setItem(`nft-${props.id}`, uri);
                //}
                  //  });
              // }
            })()
        }   
    }, [contract, ipfs]);


    return (
        
        <div className = "animal-card">
            {loaded}
            {}
            <div className = "animal-card-img" >
               
                {/* {imgData} */}
                {<img src = {animal.image} onLoad = {() => (props.onLoad) && props.onLoad!(animal)} />}
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
                    <a href = {`https://ropsten.etherscan.io/token/${contractAddress.toLowerCase()}?a=${props.id}`}> View on block explorer </a>
                </div>
                <div>
                    Art by {animal.artist}
                </div>
                <div>
                    {(address !== owner) &&
                    <div className = "info">
                        <div>
                            <i className="ri-price-tag-3-line"></i> {animal.price || 0.05}<span className="iconify" data-icon="logos:ethereum"> ETH </span>
                        </div>
                     
                        <br />
                        {(props.dropped == null || props.dropped! ==  1)? <button title = "Purchase Token" onClick = {buy} className = "call-to-action primary" style = {{width: "100%", display: "block", margin: 0}}>
                            Buy 
                        </button> : "Wait until full collection is dropped to buy"}
                    </div>}
                </div>
            </div> : 
            <div>
                Loading, please wait a few moments.
            </div>}
        </div>
    )
}