import React, { useContext, useEffect, useRef } from "react";
import { Web3Context } from "../../context/Web3Context";
import "./profile.css";


import { AuthContext } from "../../context/AuthContext";
import Tabs from "../../components/Tabs";
import Zoo from "../nft-business/display/Zoo";
import AnimalImage from "../nft-business/display/AnimalImage";
import MintToken from "../nft-business/mint/MintToken";
import { art, backdrops } from "../../core";


export default function Profile() {
    const {address, connect, web3, networkId, contract} = useContext(Web3Context);
    const user = useContext(AuthContext);
   // const [account, setAccount] = useState(null);
    //const [contract, setContract] = useState(null);
  //  const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        connect();
        
    }, [])

    useEffect(() => {
        if (contract) {
            console.log(address);
          
            //    // setAccount(account_);
            // contract.methods.tokenURI(0).call({from: address}).then((res: any) => console.log(JSON.parse(res)));
         //   })()
     //   contract.methods.approve("0x8767810706336e2471444e260dA71D5cB60e09aC", 0).send({from: address});
  //  contract.methods.createCollectible(/*"0xf076c5Dc80e448865190156c5e0C9A361DeF6dD3", */'{"name":"Elephant #0","image":"/nfts/elephant.jpg","species":"Pygmy Elephant", "artist": "Siddham Chatterjee"}').send({from: address});
        }
    }, [contract])
  
    return (
        <div id = "profile" className = "background-container">
            <div>
                
            </div>
           <> 
            {address? 
            <>
            
           <main>
                <h2>
                    <i className="ri-user-3-fill"></i>
                    {user?.username || "Unnamed User"}'s Profile
                    <div style = {{fontSize: 11}}>
                        {user?.email}
                    </div>
                </h2>
                <hr />
                <Tabs tabs = {["Herd", "Settings"]} content = {[
                    <Zoo />,
                    <div>
                        settings
                    </div>
                ]}/>
                
            </main> 
            </> : "Connecting to an account"}
            </>
        </div>
    )
}