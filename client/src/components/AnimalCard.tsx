import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "../context/Web3Context";


import "../styles/animal-card.css";

export default function AnimalCard(props: {id: number}) {
    const {contract, address} = useContext(Web3Context);
    const [animal, setAnimal] = useState<any>({});
    const [owner, setOwner] = useState("");

    function buy() {
        contract.methods.purchaseToken(props.id).send({from: address});
    }
    useEffect(() => {   
        if (contract) {
            contract.methods.tokenURI(props.id).call({from: address})
                .then((uri: any) => {
                    console.log(uri);
                    setAnimal(JSON.parse(uri));
                    contract.methods.ownerOf(props.id).call({from: address})
                        .then((res:string) => {
                            console.log(res);
                            setOwner(res);
                        })
                });
        }   
    }, [contract])
    return(
        
        <div className = "animal-card">
            <strong>
                {animal.name}
            </strong>
            <hr />
            <div className = "animal-card-img" style = {{backgroundImage: `url(${animal.image})`}}>
                
            </div>
            <div className = "basic-info">
                <div>
                    Species: {animal.species}
                </div>
                <div style = {{display: "flex", justifyContent: "space-between"}}>
                    <div>

                    Price: 0 ETH
                    </div>
                    {(address !== owner) &&
                    <div>
                        <button onClick = {buy}>
                            Buy
                        </button>
                    </div>}
                </div>
            </div>
        </div>
    )
}