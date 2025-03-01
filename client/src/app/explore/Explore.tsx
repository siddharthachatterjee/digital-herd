import React, { useContext, useEffect, useState } from "react";
import AnimalCard from "../nft-business/display/AnimalCard";
import { Web3Context } from "../../context/Web3Context";


import { Animal, animalNames, animals, getShuffled, NFTS_TO_LOAD, NFT_DISPLAY, shuffleArray, Web3ContextValues } from "../../core";

import "./explore.css";

export default function Explore() {
    const {contract, address, autoConnect, networkId, contractAddress}: Web3ContextValues = useContext(Web3Context);
    const [tokenCount, setTokenCount] = useState(0);
    const [tokens, setTokens] = useState<any[]>([]);
    const [show, setShow] = useState<number>(1000);
    const [counter, setCounter] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [dropped, setDropped] = useState(0);
    const loadTime = 5
    const [checkedAnimal, setCheckedAnimal] = useState<{[K:number]: boolean}>({});
    const [objects, setObjects] = useState<any>([]);
    const [cards, setCards] = useState<any[]>([]);
    const [nfts, setNFTs] = useState<any[]>([]);

    function load() {
        return loaded >= tokens.length;
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
            // contract.methods.getUser(contractAddress).call({from:address}).then((res:{tokens:any[]}) => {
            //    //r let tokens = res.tokens.join("").split("");
            //    // shuffleArray(tokens);
            //    // console.log(tok)
            //     setTokens((res.tokens));
            // //    console.log(res.tokens);
               

            //     // (async() => {

            //     //     res.tokens.forEach((id, i) => {
            //     //         (async () => {
            //     //             const uri:string = await contract.methods.tokenURI(id).call({from: address})
            //     //             setObjects(prev => [...prev, {id, ...JSON.parse(uri)}])
            //     //         })()
            //     //         //
            //     //     })
            //     // })()
            //   //  console.log(res.tokens);
            // })
            contract.methods.tokenCount().call({from: address})
                .then((res: number) => {
                    setTokenCount(res);       
                  //  console.log(Array(res).fill(null).map((_, i) => i));
                  if (res > 0)
                    setTokens(Array(+res).fill(null).map((_, i) => i).filter(i => i > 35));
                });
            
            contract.methods.state().call({from: address})
                .then((res: number) => {
                    let date = new Date();
                    if (date.getFullYear() == +process.env.REACT_APP_DROP_YEAR! && date.getMonth() == +process.env.REACT_APP_DROP_MONTH! && date.getDate() == +process.env.REACT_APP_DROP_DATE!) {
                        setDropped(1);
                        contract.methods.dropCollection.call({from: address});
                    }
                    else setDropped(0);
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
               // console.log(id);
                //if (id) {
                    cardAnimals[id] = (
                        <AnimalCard 
                            dropped = {dropped} 
                            onFetch = {(obj) => {
                                setObjects((prev: any) => ({...prev, [id]: obj}))
                            }}
                            onLoad = {(obj) => {
                                setLoaded(prev => prev + 1);
                            }} 
                            id = {+id} key = {i} />
                    )
                //}
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

    // useEffect(() => {
    //     setNFTs((Object.keys(cards)).filter((id) => checkedAnimal[animalNames.indexOf(objects[id]?.species)]))
    // }, [checkedAnimal])
    return (
        <>
        {tokens.length? <div id = "explore" className = "background-container">
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
                    <h2> Loading NFT images...({Math.floor(Math.max(100 * loaded/tokens.length, 0))}%) </h2>
                    <br />
                    <div className="loading-bar" style = {{width: 350}}> 
                        <div className="progress" style = {{width: (loaded) * (350/tokens.length)}}/> 
                    </div>
                    {/* <h2>
                    If this page is not loading, try checking to see if you are securely connected(https) or try switching browsers
                    </h2> */}
                </div>
            </div>}
            <div style = {window.innerWidth > 500 ? {display: "grid", gridTemplateColumns: `repeat(2, auto)`, width: "100vw"} : {display: "flex", flexDirection: "column"}}>
                {tokens.length && <div style = {{padding: "20px", borderRight: "2px solid var(--theme-green", background: "whitesmoke", ...(window.innerWidth > 500? {minHeight: "100vh",  width: "300px"} : {width: "100%", height: "max-content", borderBottom: "1px solid var(--theme-green)"})}}>
                    <h1 style = {{textAlign: "center", color: "var(--theme-green)"}}> Filter NFTs </h1>
                    <hr />
                    <h3>Animal Species: </h3> 
                    {tokens.length === 0? "No tokens have been minted":
                    <ul>
                        {animals.map((animal: Animal, i: number) => (
                            <li key = {i} style = {{fontSize: 20}}>
                                <input style = {{fill: "green"}} checked = {checkedAnimal[i]} type = "checkbox" onChange = {e => { setCheckedAnimal(prev => ({...prev, [i]: e.target.checked})) }} />
                                {animal.species}
                            </li>
                        ))}
                    </ul>}
                  
                </div>}
                
                {/* <div style = {{display: "none"}}>
                    {Object.values(cards).slice(0, show)}
                </div> 
         */}
                {<div className = "nfts" style = {{display: true? "flex" : "none"}}>
                    
                    
                    {(Object.keys(cards)).map((id) => (
                    <div style = {{display: checkedAnimal[animalNames.indexOf(objects[id]?.species)]? "block" : "none"}}> 
                    {cards[+id]}
                    </div>))}
                    
                        {/* {tokens.slice(0, Math.min(show, tokens.length)).map((id, i) => (
                        
                        ))} */}
                </div>}
            </div>
            {/* {load() && <div style = {{display: "flex", width: "100%", justifyContent: "center"}}>
                    <button className= "call-to-action primary" onClick = {() => setShow(prev => prev + NFT_DISPLAY)}> Load More </button>
            </div>} */}
            Loading more tokens... ({Object.keys(objects).length}/{tokens.length})

        </div>: !address && <>Connecting to an account...(make sure you are signed in to wallet and connected).<br/> If you are using MetaMask, check to see if you received a popup notification in the corner for signing in. <br/>Once you are connected, try reloading the page</>}
        </>

    )
}