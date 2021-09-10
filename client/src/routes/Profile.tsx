import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "../context/Web3Context";
import AnimalsCollectibleContract from "../contracts/AnimalsCollectible.json";
import "../styles/profile.css";

import { onAuthStateChanged, getAuth, User} from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import Tabs from "../components/Tabs";
import Zoo from "../components/Zoo";

export default function Profile() {
    const {address, account, connect, web3, networkId, contract} = useContext(Web3Context);
    const user = useContext(AuthContext);
   // const [account, setAccount] = useState(null);
    //const [contract, setContract] = useState(null);
  //  const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        connect();
        
    }, [])

    useEffect(() => {
        if (contract) {
            (async () => {
                // const account_ = await contract.methods.getUser(address).call({from: address});
            //    // setAccount(account_);
             //   contract.methods.tokenURI(0).call({from: address}).then((res: any) => console.log(res))
            })()
      //   contract.methods.createCollectible(address, '{"name":"Tom the Tiger","image":"http://localhost:3000/tiger.jpeg"}').send({from: address})
        }
    }, [contract])
  
    return (
        <div id = "profile" className = "background-container">
           <> 
            {address? 
            <>
           <main>
                <h2>
                    <i className="ri-user-3-fill"></i>
                    {user?.displayName}'s Profile
                </h2>
                <div style = {{fontSize: 11}}>

                (If your zoo is not showing correctly, you may have purchased NFTs with a different address. Switch to that address then reload the page)
                </div>
                <hr />
                <Tabs tabs = {["Zoo"]} content = {[
                    <Zoo />
                ]}/>
                
            </main> 
            </> : "Connecting to an account"}
            </>
        </div>
    )
}