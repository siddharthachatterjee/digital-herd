export const ETH = 1e18;

export const art = [
    {"image":"/nfts/rhino.png","species":"Javan Rhino"},
   //{"image": "/nfts/elephant.png", "species": "Pygmy Elephant"}
]

export const backdrops: {[K: string]: string[]} = {
    "Javan Rhino": [
        "lightgreen",
        "lightblue",
        "lightcoral",
        "lightyellow"
    ],
    "Pygmy Elephant": [
        "lightgreen",
        "lightblue",
        "lightcoral",
        "lightyellow"
    ]
}

export interface Web3ContextValues {
    connect: () => Promise<any>;
    autoConnect: () => void; 
    connectMetamask: () => void;
    connectWalletLink: () => void;
    account: any;
    contract: any;
    web3: any;
    address: string; 
    loading: boolean; 
    error: string;
    networkId: number;
    contractAddress: string;
}

export const network = "ropsten";