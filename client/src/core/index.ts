export const ETH = 1e18;

export interface Animal {

}

export const art = [
    {"image":"/nfts/rhino/face1.png","species":"Javan Rhino"},
   // {"image": "/nft/rhino/face1.png", "species": "Javan Rhino"}
   //{"image": "/nfts/elephant.png", "species": "Pygmy Elephant"}
]

export const animals = [
    {
        species: "Javan Rhino",
        faces: Array(2).fill(null).map((_, i) => (
            `/nfts/rhino/face${i + 1}.png`
        )),
        backdrops: Array(3).fill(null).map((_, i) => (
            `/nfts/rhino/background${i + 1}.png`
        )),
        accessories:[
            [
                `/nfts/rhino/horn1.png`,
            ],
            [
                `/nfts/rhino/expression1.png`
            ]

        ],
    }
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

//btoa("")