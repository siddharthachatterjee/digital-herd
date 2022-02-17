import React, { useContext, useEffect, useState } from "react";
import AnimalCard from "../nft-business/display/AnimalCard";
import { Web3Context } from "../../context/Web3Context";


import { Animal, animalNames, animals, getShuffled, NFTS_TO_LOAD, NFT_DISPLAY, shuffleArray, Web3ContextValues } from "../../core";

import "./explore.css";

export default function Explore() {
    const {contract, address, autoConnect, networkId, contractAddress}: Web3ContextValues = useContext(Web3Context);
    const [tokenCount, setTokenCount] = useState(0);
    const [tokens, setTokens] = useState<any[]>([]);
    const [show, setShow] = useState<number>(NFT_DISPLAY);
    const [counter, setCounter] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [dropped, setDropped] = useState(0);
    const loadTime = 5
    const [checkedAnimal, setCheckedAnimal] = useState<{[K:number]: boolean}>({});
    const [objects, setObjects] = useState<any>([]);
    const [cards, setCards] = useState<any[]>([]);

    function load() {
        return loaded >= (NFTS_TO_LOAD);
    }
    function filterCards() {
        return Object.keys(cards).filter((id) => (
        checkedAnimal[animalNames.indexOf(objects[id]?.species)]
         ))
    }
    useEffect(() => {
        
        autoConnect();
        setTimeout(() => {
            setCounter(prev => prev + 1);
        }, 250)
        animalNames.forEach((_, i) => setCheckedAnimal(prev => ({...prev, [i]: true})))
    }, [])
    useEffect(() => {
        if (contract && contractAddress) {
            contract.methods.getUser(contractAddress).call({from:address}).then((res:{tokens:any[]}) => {
               //r let tokens = res.tokens.join("").split("");
               // shuffleArray(tokens);
               // console.log(tok)
                setTokens((res.tokens));
            //    console.log(res.tokens);
               

                // (async() => {

                //     res.tokens.forEach((id, i) => {
                //         (async () => {
                //             const uri:string = await contract.methods.tokenURI(id).call({from: address})
                //             setObjects(prev => [...prev, {id, ...JSON.parse(uri)}])
                //         })()
                //         //
                //     })
                // })()
              //  console.log(res.tokens);
            })
            contract.methods.tokenCount().call({from: address})
                .then((res: number) => setTokenCount(res));
            
            contract.methods.state().call({from: address})
                .then((res: number) => {
                    let date = new Date();
                    if (res == 0 && date.getFullYear() == +process.env.REACT_APP_DROP_YEAR! && date.getMonth() == +process.env.REACT_APP_DROP_MONTH! && date.getDate() == +process.env.REACT_APP_DROP_DATE!) {
                        setDropped(res);
                        contract.methods.dropCollection.call({from: address});
                    }
                    else setDropped(res);
                })
            // let date = new Date();
            // if (date.getFullYear() == +process.env.REACT_APP_DROP_YEAR!) {
            //    setDropped(1);
            // }   
        }
    }, [contract])
    useEffect(() => {
        if (tokens && tokens.length) {
            let cardAnimals: any = {};
            (tokens).forEach((id, i) => {
                cardAnimals[id + ""] = (
                    <AnimalCard 
                        dropped = {dropped} 
                        onLoad = {(obj) => {
                            setLoaded(prev => prev + 1);
                            setObjects((prev: any) => ({...prev, [id]: obj}))
                        }} 
                        id = {+id} key = {i} />
                )
            });
         // console.log(getShuffled((cardAnimals)));
            setCards({...cardAnimals});
        }
        // if (tokens && tokens.length) {
        //     let newTokens = [...tokens.slice(0, Math.min(tokens.length, show))];
        //     shuffleArray(newTokens);
        //     setTokens(newTokens);
        // }
    }, [tokens])
    return (
        <div id = "explore" className = "background-container">
            <header>
                <h1> Marketplace </h1>
                {dropped == 0 && 
                    (<h2> Full collection drops March 3rd, 2022. </h2>)
                }
                {/* <p>
                    The rarer the species, the more expensive. Stay tuned for when new NFTs will be minted.
                </p> */}
            </header>
            {(!load() && tokens.length) &&
            <div className= "loading">
                <div>
                    <h2> Loading NFT images...({Math.floor(Math.max(100 * loaded/Math.min(show, tokens.length), 0))}%) </h2>
                    <br />
                    <div className="loading-bar" style = {{width: 350}}> 
                        <div className="progress" style = {{width: (loaded) * (350/Math.min(show, tokens.length))}}/> 
                    </div>
                    {/* <h2>
                    If this page is not loading, try checking to see if you are securely connected(https) or try switching browsers
                    </h2> */}
                </div>
            </div>}
            {tokens.length === 0? "No tokens have been minted":
            <>
                {animals.map((animal: Animal, i: number) => (
                    <div key = {i}>
                        <input checked = {checkedAnimal[i]} type = "checkbox" onChange = {e => { setCheckedAnimal(prev => ({...prev, [i]: e.target.checked})) }} />
                        {animal.species}
                    </div>
                ))}
            </>}
            <div style = {{display: "grid"}}>
                <div style = {{display: "none"}}>
                    {Object.values(cards).slice(0, show + NFT_DISPLAY)}
                </div> 
        
                <div className = "nfts" style = {{display: true? "flex" : "none"}}>
                    
                    
                    {(Object.keys(cards)).map((id) => (
                    <div style = {{display: checkedAnimal[animalNames.indexOf(objects[id]?.species)]? "block" : "none"}}> 
                    {cards[+id]}
                    </div>)).slice(0, Math.min(show, tokens.length))}
                    
                        {/* {tokens.slice(0, Math.min(show, tokens.length)).map((id, i) => (
                        
                        ))} */}
                </div>
                {show < filterCards().length && load() && <div style = {{display: "flex", width: "100%", justifyContent: "center"}}>
                        <button className= "call-to-action primary" onClick = {() => setShow(prev => prev + NFT_DISPLAY)}> Load More </button>
                </div>}
            </div>
        </div>
    )
}