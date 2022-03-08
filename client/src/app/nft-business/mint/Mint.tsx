import React, { useContext, useEffect, useState, useRef } from "react";
import MintToken from "./MintToken";
import AnimalImage from "../display/AnimalImage";

import {getDatabase, ref,set, get, child} from "firebase/database";

import { Web3Context } from "../../../context/Web3Context";
import {IPFSContext} from "../../../context/IPFSContext";
import { allAccessoryArrays, Animal, animalNames, animals, art, backdrops, ETH, shuffleArray } from "../../../core";

//console.log(allAccessoryArrays(0))

export default function Mint() {
    const {address, connect, contract, contractAddress} = useContext(Web3Context);
    const {ipfs} = useContext(IPFSContext);
    const [tokens, setTokens] = useState<any>({0: [], 1: [], 2: []});
    const [tokensMint, setTokensMint] = useState<any[]>([]);
    const [checkedAnimal, setCheckedAnimal] = useState<{[K:number]: boolean}>({});
    const [number, setNumber] = useState("1000");
    const [animalLimit, setAnimalLimit] = useState<any>({});
    const [include, setInclude] = useState<any>([]);
    const counted: any = {};
    const [a, setA] = useState<any>(null);
    const [ipfsUrls, setIPFSURLs] = useState<any>({0: [], 1: [], 2: []});
    const [currentToken, setCurrentToken] = useState(0);

    function changeInclude(i: number, j: number, k: number) {
        let newInclude = [...include];
        newInclude[i][j][k] = !newInclude[i][j][k];
        setInclude(newInclude);
    }
    useEffect(() => {   
        connect();
        (() => {
            let  original: boolean[][][] = [];
            for (let i = 0; i < animals.length; i++) {
                original.push([]);
                for (let j = 0; j < animals[i].faces.length; j++) {
            
                    let src = animals[i].faces[j];
                    animals[i].images[src] = new Image();
                    animals[i].images[src].src = src;
                }
                for (let j = 0; j < animals[i].backdrops.length; j++) {
                    
                
                    let src = animals[i].backdrops[j];
                    animals[i].images[src] = new Image();
                    animals[i].images[src].src = src;
                }
                for (let j = 0; j < animals[i].accessories.length; j++) {
                    original[i].push([]);
                    for  (let k = 0; k < animals[i].accessories[j].length; k++) {
                        let src = animals[i].accessories[j][k];
                        animals[i].images[src] = new Image();
                        animals[i].images[src].src = src;
                        original[i][j].push(true);
                    }
                }
            }
            setInclude(original);
        })()
       // console.log(new File(["foo"], "foo.txt", {type: "text/plain"}))
    }, []);

    function onDrawn(canvasRef: any, images: string[], animal: any, backdrop: string) {
        //if (!counted[url]) {
         const buffer = Buffer.from(canvasRef.current.toDataURL().split(",")[1], "base64");
           // if (!counted[buffer.toString()]) {
        //  setA(buffer.toJSON());
               (async () => {
                    const result = await ipfs.add({path: "/tmp/", content: buffer}, {pin: true}); 
                    // if (tokens.length == 0)
                    //     console.log(result);
                    //  console.log(result);
                const {cid} = result;
                    const url = "https://ipfs.io/ipfs/" + cid.toString();
                    //const chunks:any = [];
                    ///console.log(hash);
                    // const stream = ipfs.cat(cid.toString());
                    //                 //console.log(uri);
            
                    //                 for await (const chunk of stream) {
                    //                     chunks.push(...chunk);
                    //                 }
                    //setA("data:image/png;base64," + Buffer.from(chunks).toString("base64"));
                //    console.log(JSON.stringify(chunks) == JSON.stringify(buffer));
                    const obj = JSON.stringify({image:url,species:animal.species,images});
                /// if (!counted[url])
                    setTokens((prev: any) => ({...prev, [animalNames.indexOf(animal.species)]: [...prev[animalNames.indexOf(animal.species)], obj]}));
                  //  counted[buffer.toString()] = true;
               })();
         //   }
     //   }
    }

    function mintAll() {
        let tokensToMint: any[] = [];
        for (let i = 0; i < animalNames.length; i++) {
            let shuffled = tokens[i];
          //  shuffleArray(shuffled);
            let len = Math.min(shuffled.length, +animalLimit[i]);
            for (let j = 0; j < len; j++) {
            
                tokensToMint.push(shuffled[j])
            }
            setTokens((prev: any) => ({...prev, [i]: prev[i].filter((token:any) => !tokensToMint.some(nft => nft == token))}))
        }
        shuffleArray(tokensToMint);
        console.log(tokensToMint.length);
        let len = Math.min(tokensToMint.length, 1e6);
        let perTxn = 20;
        for (let i = 0; i < len; i++) {
          //  const json = 
            //const data = canvasRef.current.toDataURL();
          
            contract.methods.createCollectible(tokensToMint[i], contractAddress).send({from: address})

        }
        // const db =getDatabase();
        // get(child(ref(db), "current-token"))
        //     .then(snapshot => {
        //         set(ref(db, "current-token"), snapshot.val() + tokensToMint.length)
        //     })
        // for (let i = 0; i < len/perTxn; i++) {
        // contract.methods.createCollectibles(tokensToMint.slice(i * perTxn, Math.min((i + 1) * perTxn, len))).send({from: address})
        // }
    }

    function save() {   
        const db =getDatabase();
        let tokensToMint = [];
        for (let i = 0; i < animalNames.length; i++) {
            let shuffled = tokens[i];
            shuffleArray(shuffled);
            let len = Math.min(shuffled.length, +animalLimit[i]);
            for (let j = 0; j < len; j++) {
                tokensToMint.push(shuffled[j])
            }
        }
        console.log(tokensMint.length);
        shuffleArray(tokensToMint);
        set(ref(db, "/nfts"), tokensToMint);
    }   

    function getFromDb() {
        let data: {[k: number]: any[]} = {0: [], 1: [], 2: []};
        get(child(ref(getDatabase()), "nfts"))
            .then(snapshot => {
                if (snapshot.exists()) {
                    let nfts = snapshot.val();
                    get(child(ref(getDatabase()), `current-token`))
                        .then(snap2 => {
                            setCurrentToken(snap2.val());
                            for (let i = +snap2.val(); i < nfts.length; i++) {
                                let json = JSON.parse(nfts[i]);
                                json.image = "ipfs://" + json.image.split("https://ipfs.io/ipfs/")[1];
                                console.log(json);
                                ipfs.add({path: "/tmp/", content: JSON.stringify(json)}, {pin: true})
                                    .then((result: any) => {

                                        const {cid} = result;
                                        setTokens((prev: any) => ({...prev, [animalNames.indexOf(json.species)]: [...prev[animalNames.indexOf(json.species)], "ipfs://" + cid]}));
                                    })
                               
                            }
                          //  setTokens(data);
                        });
                     //   console.log(obj);
                      
                   
                   // setTokens(data);
                }
            })
            
    }
 
    function onDrawnFromDb(canvasRef: any, json: any) {
        
        //setMinted(true);
        (async () => {

            const data = canvasRef.current.toDataURL();
            json.image = data;
            const result = await ipfs.add({path: "/tmp/", content: JSON.stringify(json)}, {pin: true}); 
            const {cid} = result;
            setIPFSURLs((prev: any) => ({...prev, [animalNames.indexOf(json.species)]: [...prev[animalNames.indexOf(json.species)], "ipfs://" + cid]}));
           // setData("ipfs://" + cid);
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



    return address  && ipfs && address === "0x8767810706336e2471444e260dA71D5cB60e09aC" && (
        <>
        
        <h1> Mint these tokens: </h1>
        <button onClick = {mintAll}> Mint All </button>
        <button onClick = {save}> Save to Database </button>
        <button onClick = {() => setTokens([])}> Reset </button>
        <button onClick = {getFromDb}> Get From Database </button>
        {animals.map((animal: Animal, i: number) => (
            <div key = {i}>
                <input checked = {checkedAnimal[i]} type = "checkbox" onChange = {e => { setCheckedAnimal(prev => ({...prev, [i]: e.target.checked})) }} />
                {animal.species}
                {", Limit:"}
                <input type = "number" value = {animalLimit[i] || 0} onChange = {e => setAnimalLimit((prev:any) => ({...prev, [i]: e.target.value}))}></input>
                ({tokens[i]?.length} created)
                <br />
                Layers:
               <ol>

                    {animals[i].accessories.map((as: any[], j: number) => (
                        <>
                        <li>
                            <ul>

                                {as.map((a, k: number) => (
                                    <li>
                                    <input type = "checkbox" checked = {include[i][j][k]} onChange = {() => changeInclude(i, j, k)} />
                                    {a}
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <br />
                        </>
                    ))}

                </ol>
            </div>
        ))}
        {tokens.length && a && <img src = {a}  />}
        {a}
        <br/>
        Number: 
        <input type = "number" value = {number} onChange = {e => setNumber(e.target.value)} />
        {animals.map((animal: Animal, i: number) => checkedAnimal[i] && (
            <>
            {tokens[i]?.length}
            {animal.backdrops.map((bd: any, j) =>  {
                let accessories = allAccessoryArrays(i, include);
                return (
                    animal.faces.map((face, k) => (
                        accessories.map((accessory, l) => (
                            <div style = {{display: "inline-block"}}>

                                <AnimalImage i = {i} accessories = {accessory} onDrawn = {(cnvsRef: any, images: string[]) => {onDrawn(cnvsRef, images, animal, bd)}}  image = {face} background = {bd}  />
                            </div>
                        ))
                    ))
                )
            })}
            </>
        ))} 
        <br />

        
        <h2> Data: </h2>
        {JSON.stringify(Object.values(tokens))}
        {/* {JSON.stringify(Object.values(tokens))} */}
        {/* {Object.values(tokens).map((arr: any, i) => (
            arr.map((obj: any) => (
                <AnimalImage size = {350} i = {animalNames.indexOf(JSON.parse(obj).species)} background={JSON.parse(obj).images![0]} image = {JSON.parse(obj).images![1]} accessories = {JSON.parse(obj).images!.slice(2)} onDrawn = {(canvasRef) => onDrawnFromDb(canvasRef, JSON.parse(obj))} />
            ))
        ))} */}
        {/* {a && <img src = {"data:image/png;base64," + Buffer.from(a).toString("base64")} />} */}
        
        <br />
    
        </>
    );
}