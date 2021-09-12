import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "../context/Web3Context";


import "../styles/animal-card.css";

export default function AnimalCard(props: {id: number}) {
    const {contract, address} = useContext(Web3Context);
    const [animal, setAnimal] = useState<any>(null);
    useEffect(() => {   
        if (contract) {
            contract.methods.tokenURI(props.id).call({from: address})
                .then((uri: string) => {
                    setAnimal(JSON.parse(uri));
                });
        }   
    }, [contract])
    return animal && (
        <div className = "animal-card">
            <div className = "animal-card-img" style = {{background: `url(${animal.image})`}}>
                
            </div>
        </div>
    )
}