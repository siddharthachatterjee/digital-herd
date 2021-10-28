import React, { useEffect, useRef } from "react";

interface AnimalImageProps {
    image: string;
    background?: string;
    canvasRef: React.MutableRefObject<any>
}
export default function AnimalImage(props: AnimalImageProps) {
    const {canvasRef} = props;

    function draw() {
        const canvas: any = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = props.background || "lightgreen";
            ctx.fillRect(0, 0, 200, 200);
            const image = new Image();
            // image.width = 100;
            //  image.height = 1500;
            // image.width = "100%";
            image.src = props.image;
            image.onload = () => {
                ctx.drawImage(image, 0, 0, 200, 200); 
            }
        }
    }
    
    useEffect(() => {
        draw();
    },[canvasRef.current])
    return (
        <canvas className = "animal-image" ref = {canvasRef} width = {200}  />
    );
}