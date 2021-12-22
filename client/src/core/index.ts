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
                `/nfts/rhino/horn2.png`,
            ],
            [
                `/nfts/rhino/expression1.png`,
                `/nfts/rhino/expression2.png`,
                `/nfts/rhino/expression3.png`
            ],
            [
               `/nfts/rhino/Grass.png`,
               `/nfts/rhino/Leaves.png`
            ]

        ],
    }
]

export function allAccessoryArrays(i: number, j:number = animals[i].accessories.length - 1, perm: string[][] = [[]], arr: string[][]  = []) {
    if (j < 0) {  
        return perm;
    }
    //console.log(arr);
    for (let k = 0; k < animals[i].accessories[j].length; k++) {
        let permutation = allAccessoryArrays(i, j - 1, [[...perm[0], animals[i].accessories[j][k]]], arr)!;
        if (permutation[0].length === animals[i].accessories.length) {
            arr.push(...permutation)
        }
        //arr.push(...!)
    }
    if (j == animals[i].accessories.length - 1)
        return arr;
   // console.log(j, perm, arr);
    return perm;
}   

//console.log(allAccessoryArrays(0));


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