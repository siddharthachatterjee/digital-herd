import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "../context/Web3Context";
import AnimalsCollectibleContract from "../contracts/AnimalsCollectible.json";
import "../styles/profile.css";


export default function Profile() {
    const {address, connect, web3, networkId, contract} = useContext(Web3Context);
    //const [contract, setContract] = useState(null);
    const [user, setUser] = useState({
        username: "Untitled User",
    });
    useEffect(() => {
        connect()
    }, [])
    useEffect(() => {
        if (contract) {
            // const network = AnimalsCollectibleContract.networks[networkId];
            // const instance = new web3.eth.Contract(AnimalsCollectibleContract.abi, network && network.address);
            // instance.defaultAccount = address;

            // setContract(instance);
          
            //alert("hi")
            contract.methods.getUser(address).call({from: address}).then((res) => {
                setUser(prev => ({
                    ...prev,
                    ...res
                }));
            })
            
        }
    }, [contract])
    return (
        <div id = "profile" className = "background-container">
            <main>
                <h2>
                    {user.username || "Untitled User"}
                </h2>
                <hr />
                Address: {address}
                <input value = {user.username || "Untitled User"} onChange = {(e) => setUser(prev => ({...prev, username: e.target.value}))}/>
                
            </main>
        </div>
    )
}