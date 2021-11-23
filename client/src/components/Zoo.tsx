import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Web3Context } from "../context/Web3Context";
import AnimalCard from "./AnimalCard";

export default function Zoo() {
    const {account, contract, address} = useContext(Web3Context);
    const [zoo, setZoo] = useState({});
    const history = useHistory();
    useEffect(() => {
       // console.log(JSON.parse('{"name":"Tom the Tiger","image":"http://localhost:3000/tiger.jpeg"}'));
        if (account && contract) {
            account.tokens.forEach((token: number) => {
           //     console.log(token);
              //  contract.methods.tokenURI(0).call({from: address}).then((res: any) => console.log(res))
                contract.methods.tokenURI(token).call({from: address}).then((uri:any) => {
                 //   const json = JSON.parse(uri);
                    setZoo(prevZoo => ({
                        ...prevZoo,
                        [token]: JSON.parse(uri)
                    }))
                    
                })
            })
        }
    }, [account])
    return (
        <div>
            <br />
          
            {Object.values(zoo).length? Object.values(zoo).map((item: any, i) => (
                <div key = {i}>
                    <AnimalCard id = {account.tokens[i]} />
                </div>
            )) : 
            <>
            You have no NFTs. 
            <br />
            <button className = "call-to-action primary" onClick = {() => history.push("/explore")}>
                Explore Marketplace
            </button>
            </>}
        </div>
    );
}