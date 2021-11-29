import React, { useEffect, useRef } from "react";

interface AnimalImageProps {
    image: string;
    background?: string;
    canvasRef?: React.MutableRefObject<any>;
    onDrawn: (canvasRef: any) => void;
    size?: number;
}
export default function AnimalImage(props: AnimalImageProps) {
    const canvasRef = useRef<any>(null);
    const size = props.size || 300;

    function draw() {
        const canvas: any = canvasRef.current;
        if (canvas) {
            
            const image = new Image();
            // image.width = 100;
            const ctx = canvas.getContext("2d");
            //  image.height = 1500;
            // image.width = "100%";
            image.src = props.image;
            ctx.fillStyle = props.background || "lightgreen";
            ctx.fillRect(0, 0, size, size);
            image.onload = () => {
                ctx.drawImage(image, 0, 0, size, size); 
             //   if ("onDrawn" in props) 
               // setTimeout(() => {

                props!.onDrawn(canvasRef);
                //}, 500)
            }
        }
    }
    
    useEffect(() => {
        if (canvasRef && canvasRef.current)
            draw();
    },[canvasRef.current])
    return (
        <canvas height = {size} width = {size} className = "animal-image" ref = {canvasRef}   />
    );
}