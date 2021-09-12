import React, { useState } from "react";


interface TabsProps {
    bar?: (props: {curTab: number, setCurTab: React.Dispatch<React.SetStateAction<number>>}) => JSX.Element;
    tabs:any[];
    content: JSX.Element[];
}

export default function Tabs(props: TabsProps) {
    const [curTab, setCurTab] = useState(0);
    const {bar: TabBar} = props; 

    function switchTab(i: number) {
        const start = (i < curTab)? 50 : (i > curTab)? -50 : 0;
        [...Array.from(document.querySelectorAll(".tabs .content"))].forEach((elem) => {
            elem.animate([
                { transform:`translateX(${start}px)`, opacity: 0},
                { transform:"translateX(0px)", opacity: 1 }
            ], {
                duration: 500
            });
        });
        setCurTab(i);
    }
    return (
        <div className = "tabs">
            {TabBar?<TabBar curTab = {curTab} setCurTab = {setCurTab} /> : (
                <div className = "bar">
                    {props.tabs.map((tab, i) => (
                        <div onClick = {() => switchTab(i)} className = {`tab ${i === curTab? "current" : ""}`} key = {i}>
                            {tab}
                        </div>
                    ))}
                </div>
            )}
            <div className = "content">
                {props.content[curTab]}
            </div>
        </div>
    );
}