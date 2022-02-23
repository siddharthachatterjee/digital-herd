export const ETH = 1e18;
export const NFTS_TO_LOAD = 100;
export const NFT_DISPLAY = 100;

export interface Animal {
    species: animalSpeciesType;
    faces: string[];
    backdrops: string[];
    accessories: string[][];
    images: {
        [K: string]: HTMLImageElement;
    }
}

export const art = [
    {"image":"/nfts/rhino/face1.png","species":"Javan Rhino"},
   // {"image": "/nft/rhino/face1.png", "species": "Javan Rhino"}
   //{"image": "/nfts/elephant.png", "species": "Pygmy Elephant"}
]

export type animalSpeciesType = "Bengal Tiger" | "Javan Rhino" | "Mountain Gorilla";
export const animalNames: animalSpeciesType[] = ["Bengal Tiger", "Javan Rhino"]
export const animals: Animal[]  = [
    {
        species: "Bengal Tiger",
        backdrops: Array(3).fill(null).map((_, i) => (
            `/nfts/rhino/background${i + 1}.png`
        )),
        faces: [
            `/nfts/tiger/Tiger_White.png`,
            `/nfts/tiger/Tiger_Sienna.png`,
            `/nfts/tiger/Tiger_Gold.png`,
        ],
        accessories: [
           [
            `/nfts/tiger/Mouth_Closed.png`,
            `/nfts/tiger/Mouth_Roar.png`
           ],
           [
               `/nfts/tiger/Sunglasses_Black.png`,
               `nfts/tiger/Sunglasses_Gold.png`,
               `/nfts/tiger/Sunglasses_Aviator_Blue.png`,
               `/nfts/tiger/Sunglasses_Aviator_Purple.png`,
               `/nfts/tiger/Sunglasses_Aviator_Gold.png`,
               `/nfts/tiger/Sunglasses_Aviator_Black.png`,
         //      "/blank.png",
           ],
           [
               `nfts/tiger/Habitat_Grass.png`,
               `nfts/tiger/Habitat_Leaves.png`,
               `/nfts/tiger/Habitat_Water.png`,
               "/blank.png",
           ],
           [
               `/nfts/tiger/Shirt_Green.png`,
               `nfts/tiger/Shirt_Red.png`,
               `/nfts/tiger/Shirt_Purple.png`,
               `/nfts/tiger/Shirt_Pink_Camo.png`,
               `/nfts/tiger/Shirt_Purple_Camo.png`,
           ]
        ],

        images: {},
    },
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
                `/nfts/rhino/expression3.png`,
                
            ],
            [
               `/nfts/rhino/Grass.png`,
               `/nfts/rhino/Leaves.png`,
              // `/nfts/rhino/River.png`
              
            ],
            [
                `nfts/rhino/Sunglasses_1.png`,
                `nfts/rhino/Sunglasses_2.png`,
                "",
            ],
            [
                `nfts/rhino/Beanie.png`,
               // `nfts/rhino/Fedora.png`,
                ""
            ]
        ],
        images: {
            
        },
    },
    
];



export function allAccessoryArrays(i: number, include: boolean[][][], j:number = animals[i].accessories.length - 1,  perm: string[][] = [[]], arr: string[][]  = []) {
    //console.log(perm)
    if (j < 0) {  
        return perm;
    }
    //console.log(arr);
    for (let k = 0; k < animals[i].accessories[j].length; k++) {
        if (include[i][j][k]) {
            let permutation = allAccessoryArrays(i, include, j - 1, [[...perm[0], animals[i].accessories[j][k]]], arr)!;
            if (permutation[0].length === animals[i].accessories.length) {
                arr.push(...permutation)
            }
        }
        //arr.push(...!)
    }
    if (j == animals[i].accessories.length - 1)
        return arr;
   // console.log(j, perm, arr);
    return perm;
}   

export function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (array.length));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function getShuffled(array: any[]) {
    let arrCpy = [...array];
    shuffleArray(arrCpy);
    return arrCpy;
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

btoa("")