import React, { createContext, useEffect, useRef, useState } from "react";

interface AnimalImageProps {
    image: string;
    background?: string;
    canvasRef?: React.MutableRefObject<any>;
    onDrawn: (canvasRef: any) => void;
    size?: number;
    accessories: string[];
}
export default function AnimalImage(props: AnimalImageProps) {
    const canvasRef = useRef<any>(null);
    const [imageLayers, setImageLayers] = useState<any[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const size = props.size || 300;

    function draw() {
        const canvas: any = canvasRef.current;
        if (canvas) {
            
            const face = new Image();
            const backdropImg = new Image();

            const images = [props.background, props.image, ...props.accessories]
            const imageLayers = [backdropImg, face, ...Array(props.accessories.length).fill(null).map(() => new Image())];
            setImageLayers(imageLayers);
            setImagesLoaded(imageLayers.length);
            // image.width = 100;
            const ctx = canvas.getContext("2d");
            //  image.height = 1500;
            // image.width = "100%";
            face.src = props.image;
            backdropImg.src = props.background ||  "/nfts/rhino/background1.png";
         //   ctx.fillStyle = props.background || "lightgreen";
           // ctx.fillRect(0, 0, size, size);
           imageLayers.forEach((img, i) => {
               img.src = images[i]!;
               img.onload = () => {
                    setImagesLoaded(prev => Math.max(prev - 1, 0));
               }
           })
        }
    }
    
    useEffect(() => {
        if (canvasRef && canvasRef.current)
            draw();
    },[canvasRef.current])

    useEffect(() => { 
        if (imagesLoaded == 0 && imageLayers.length) {
            imageLayers.forEach((img: HTMLImageElement) => {
                if (img.complete && img.naturalHeight)
                canvasRef.current.getContext("2d").drawImage(img, 0, 0, size, size);
            })
            props.onDrawn(canvasRef);
        }
    }, [imagesLoaded])
    return (
        <canvas height = {size} width = {size} className = "animal-image" ref = {canvasRef}   />
    );
}