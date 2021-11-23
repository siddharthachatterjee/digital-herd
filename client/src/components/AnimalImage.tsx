import React, { useEffect, useRef } from "react";

interface AnimalImageProps {
    image: string;
    background?: string;
    canvasRef: React.MutableRefObject<any>;
    onDrawn: () => void;
}
export default function AnimalImage(props: AnimalImageProps) {
    const {canvasRef} = props;

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
            ctx.fillRect(0, 0, 200, 200);
            image.onload = () => {
                ctx.drawImage(image, 0, 0, 200, 200); 
             //   if ("onDrawn" in props) 
                setTimeout(() => {

                    props!.onDrawn();
                }, 500)
            }
        }
    }
    
    useEffect(() => {
        draw();
    },[canvasRef.current])
    return (
        <canvas height = {200} className = "animal-image" ref = {canvasRef} width = {200}  />
    );
}