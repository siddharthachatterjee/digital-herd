import React from "react";

import * as IPFS from "ipfs-core";


export const IPFSContext = React.createContext(null);


export function IPFSContextProvider(props) {
    const [ipfs, setIPFS] = useState(null);
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
