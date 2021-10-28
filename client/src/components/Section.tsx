import React from "react";

import "../styles/section.css";

interface SectionProps {
    title: string;
    image: string;
    children: JSX.Element[];
    placeImageRight?: boolean;
    background?: string;
    color: string;
}


export default function Section(props: SectionProps) {
    const sectionContent  = [
        <div className = "image">
            <img src = {props.image} />
        </div>,
        <div className = "text">
            <h2 className = "title"> {props.title} </h2>
            <div className = "content">
                {props.children}
            </div>
        </div>
    ]
    return (
        <div className = "section" style = {{background: props.background || "white", color: props.color || "black"}}>
            {props.placeImageRight? sectionContent.reverse() : sectionContent}
        </div>
    )
}