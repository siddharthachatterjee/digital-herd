import React, {useContext, useEffect, useRef, useState} from "react";
import { IPFSContext } from "../../../context/IPFSContext";
//import ipfs from "../context/IPFSContext";
import { Web3Context } from "../../../context/Web3Context";
import {getDatabase, ref,set, get, child} from "firebase/database";
import { animalNames, art, backdrops, defaultAccount, ETH } from "../../../core";
import AnimalImage from "../display/AnimalImage";

import "./mint-token.css";
import { useHistory } from "react-router-dom";

export default function MintToken(props: {animal: any, backdrop: string, i?: number}) {
    const {address, connect, web3, networkId, contract, autoConnect, contractAddress} = useContext(Web3Context);
    const {ipfs} = useContext(IPFSContext);
    const {animal, backdrop} = props;

    const canvasRef = useRef<any>(null);
    const [image, setImage] = useState("");
    const [minted, setMinted] = useState(false);
    const [data, setData] = useState<any>(null);
    const [tokens, setNFTs] = useState<any>(null);
    const [currentToken, setCurrentToken] = useState<any>(-1);
    const history = useHistory();
    
    useEffect(() => {
        autoConnect()
        const dbRef = ref(getDatabase());
        get(child(dbRef, "nfts"))
            .then(snapshot => {
                if (snapshot.exists()) {
                    let nfts = snapshot.val();
                    setNFTs(nfts);
                  //  console.log(nfts.length);
                    get(child(dbRef, `current-token`))
                        .then(snap2 => {
                            setCurrentToken(snap2.val());
                            setData(JSON.parse(nfts[snap2.val()]))
                        })
                }
            })
    }, [])
    function onDrawn() {
        setMinted(true);
        if (canvasRef && canvasRef.current) {
           // console.log(contract);
          // if (address) {
             //   setImage(canvasRef.current.toDataURL());
                 //console.log("");
               // console.log(canvasRef.current!.toDataURL()!);
            // ipfs.add(canvasRef.current.toDataURL())
            //     .then(({cid}: {cid:string}) => {
            //         contract.methods.tokenCount().call({from: address})
            //             .then((res: number) => {
            //                 const object = `{"name":"${animal.species},${backdrop}","image":"https://ipfs.io/ipfs/${cid}","species":"${animal.species}"}`;
            //                 console.log(object)
            //                 contract.methods.createCollectible(object).send({from: address});
            //             })
            //     })
           
        }
    }
    
    function mint() {
        const db = getDatabase();
        console.log(currentToken)
        if (address && address != defaultAccount) {
            contract.methods.createCollectible(JSON.stringify(data), address).send({from: address, value: ETH * 0.05})
                .on("transactionHash", () => {
                    set(ref(db, "current-token"), currentToken + 1)
                        .then(() => window.location.reload());
                })
                .on("error", (err:any) => {
                    alert(err.message);
                })
        }
        else {
           history.push("/sign-up?redirect=/mint-nft");
        }
    }
    return (
        <div id = "mint-token-container">
        <div id="mint-token" style = {{display: "normal"/**"block" */}}>
            {tokens && currentToken < tokens.length - 50 ? (<>
                {!data && <h1> Creating image... </h1>}
                {data && (
                <>
                <AnimalImage i = {animalNames.indexOf(data.species)} background={data.images![0]} image = {data.images![1]} accessories = {data.images!.slice(2)} onDrawn = {onDrawn} />
                {minted &&
                <>
                <br />
                <button className="mint" onClick = {mint}> Mint this NFT (0.05 ETH fee) </button>
                </>}
                </>
                )}
            </>): tokens && "Sorry :( All tokens have been minted."}
        </div>
        </div>
    );
}