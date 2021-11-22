import React, {useState, useEffect} from "react";

import * as IPFS from "ipfs-core";


export const IPFSContext = React.createContext<any>(null);


export function IPFSContextProvider(props: {children: any}) {
    const [ipfs, setIPFS] = useState<any>(null);
    useEffect(() => {
        IPFS.create().then(node => setIPFS(node));
    }, []);
    return (
        <IPFSContext.Provider value = {{ipfs}}>
            {props.children}
        </IPFSContext.Provider>
    );
}
//export default ipfs;
