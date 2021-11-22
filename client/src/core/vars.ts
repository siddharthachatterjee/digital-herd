export const ETH = 1e18;

export const art = [
    {"image":"/nfts/rhino.png","species":"Javan Rhino"}
]

export const backdrops = [
    "lightgreen",
    "lightblue",

]

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
    networkId: 3;
}