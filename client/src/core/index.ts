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
}

export function getBuffer(dataUrl: string){

   var arr = dataUrl.split(',');
   if (arr.length && arr[0]) { 
        let mime = arr[0]!.match(/:(.*?);/)![1];
       let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
     //  console.log(bstr);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
       // console.log(u8arr)
   // return new File([u8arr], fileName, {type:mime});
        return [u8arr];
    }
}

(async () => {
    const res = await fetch("https://ipfs.io/ipfs/QmXgfFV1XqDgNXNuKyqFXNUgpwKingDkhDzYhh7xPURiTj", {
        headers: {
            'Content-Type': 'text/plain'
        }
    });
    const text = await res.text();
    //console.log(())
})()
//console.log(dataURLtoFile(``))