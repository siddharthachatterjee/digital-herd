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
    const [obj, setObj] = useState<any>(null);
    const [tokens, setNFTs] = useState<any>(null);
    const [currentToken, setCurrentToken] = useState<any>(-1);
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();
    
    useEffect(() => {
        autoConnect()
        const dbRef = ref(getDatabase());
        if (ipfs) {
        get(child(dbRef, "nfts"))
            .then(snapshot => {
                if (snapshot.exists()) {
                    let nfts = snapshot.val();
                    setNFTs(nfts);
                  //  console.log(nfts.length);
                    get(child(dbRef, `current-token`))
                        .then(async snap2 => {
                            setCurrentToken(snap2.val());
                            let json = JSON.parse(nfts[snap2.val()]);
                            setObj(json);
                            const chunks: any[] = [];
                            const stream = ipfs.cat(json.image.split("https://ipfs.io/ipfs/")[1]);
                            // setAnimal(JSON.parse(uri));
                    
                            for await (const chunk of stream) {
                                chunks.push(...chunk);
                            }
                      //      console.log(`${props.id} image fetched`)
                            //   if (chunks)
                          
                        })
                }
            })
        }
    }, [ipfs])
    function onDrawn(canvasRef: any, json: any) {
        
        setMinted(true);
        (async () => {

            const data = canvasRef.current.toDataURL();
            json.image = data;
            const result = await ipfs.add({path: "/tmp/", content: JSON.stringify(json)}, {pin: true}); 
            const {cid} = result;
            setData("ipfs://" + cid);
        })()
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
            setLoading(true);
            contract.methods.createCollectible(data, address).send({from: address, value: ETH * 0.05})
                .on("transactionHash", () => {
                 //   setLoading(false);
                    set(ref(db, "current-token"), currentToken + 1)
                        .then(() => window.location.reload());
                })
                .on("error", (err:any) => {
                    setLoading(false);
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
                {obj && (
                <>
                <AnimalImage size = {350} i = {animalNames.indexOf(obj.species)} background={obj.images![0]} image = {obj.images![1]} accessories = {obj.images!.slice(2)} onDrawn = {(canvasRef) => onDrawn(canvasRef, obj)} />
                {minted &&
                <>
                <br />
                <button disabled = {loading} className="mint" onClick = {mint}> Mint this NFT (0.05 ETH fee) </button>
                </>}
                {data}
                </>
                )}
            </>): tokens && "Sorry :( All tokens have been minted."}
        </div>
        </div>
    );
}