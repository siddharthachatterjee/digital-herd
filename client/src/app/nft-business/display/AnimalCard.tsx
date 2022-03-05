import React, { useContext, useEffect, useRef, useState } from "react";
import { IPFSContext } from "../../../context/IPFSContext";
import { Web3Context, Web3ContextProvider } from "../../../context/Web3Context";

import { animalNames, ETH, Web3ContextValues } from "../../../core";


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
            contract.methods.purchaseToken(props.id).send({from: address, value: ETH * animal.price ||  ETH * (animal.species === "Javan Rhino"? 0.15 : 0.1)});
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
                
                    const uri:string =  await contract.methods.tokenURI(props.id).call({from: address});
                   // console.log(uri);
          //          localStorage.setItem(`nft-${props.id}`, uri);
                    //if (uri && uri.split("https://ipfs.io/ipfs/")[1]) {
                     //   .then((uri: any) => {
                          //console.log(uri);
                            
                          // localStorage.etItem(`nft-${props.id}`, data);
                        if(uri[0] != "i") {
                          if (props.onFetch)
                           props.onFetch!({...JSON.parse(uri)});


                           let data = JSON.parse(uri);
                           setAnimal(() => ({
                               ...JSON.parse(uri),
                               price: data.species === "Javan Rhino"? 0.15 : 0.1
                           }));
                        }
                         //   getIPFSImag'e(uri);
    
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
            {animal && animal.images && <div className = "animal-card-img" >
            {/* {JSON.stringify(animal.images)} */}
               
                {/* {imgData} */}
                <AnimalImage size = {250} i = {animalNames.indexOf(animal.species)} image = {animal.images[1]!} background = {animal.images[0]!} accessories = {animal.images.slice(2)!} onDrawn = {() => (props.onLoad) && props.onLoad!(animal)} />
                {/* {<img src = {animal.image} onLoad = {() => (props.onLoad) && props.onLoad!(animal)} />} */}
                {/* <AnimalImage canvasRef = {canvasRef} image = {"/nfts/elephant.png"} /> */}
            </div>}
            {true? <div className = "basic-info">
                <div style = {{textAlign: "center", fontWeight: "bold"}}>
                    Animal #{props.id}
                </div>
                <hr />
                <div>
                    Species: {animal.species}
                </div>
                <div>
                    <a href = {`https://etherscan.io/nft/${contractAddress.toLowerCase()}/${props.id}`}> View on block explorer </a>
                </div>
                <div>
                    Art by {animal.artist || "Alyse Gamson"}
                </div>
                <div>
                    {(owner && contractAddress && address !== owner) ?
                    <div className = "info">
                        <div>
                            <i className="ri-price-tag-3-line"></i> {animal.price }<span className="iconify" data-icon="logos:ethereum"> ETH </span>
                        </div>
                       
                        
                        <br />
                        {(owner.length && contractAddress && address && (props.dropped == null || props.dropped! ==  0))? 
                        ((owner === contractAddress || owner === "")?
                        
                        <button title = "Purchase Token" onClick = {buy} className = "call-to-action primary" style = {{width: "100%", display: "block", margin: 0}}>
                            Buy 
                        </button>:
                        (
                        (owner === address && address != "" && owner.length > 5)?
                        <div>You own this NFT</div> :
                        <div className="sold"> Sold to {owner.slice(0, 4)}...{owner.slice(owner.length - 3)}! </div>)) : "Wait until full collection is dropped to buy"}

                    </div>:
                    (owner && <div>You own this NFT</div>)}
                </div>
            </div> : 
            <div>
                Loading, please wait a few moments.
            </div>}
        </div>
    )
}