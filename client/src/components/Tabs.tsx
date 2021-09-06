import React, { useState } from "react";


interface TabsProps {
    bar?: (props: {curTab: number, setCurTab: React.Dispatch<React.SetStateAction<number>>}) => JSX.Element;
    tabs:any[];
    content: JSX.Element[];
}

export default function Tabs(props: TabsProps) {
    const [curTab, setCurTab] = useState(0);
    const {bar: TabBar} = props; 
    return (
        <div className = "tabs">
            {TabBar?<TabBar curTab = {curTab} setCurTab = {setCurTab} /> : (
                <div className = "bar">
                    {props.tabs.map((tab, i) => (
                        <div onClick = {() => setCurTab(i)} className = {`tab ${i === curTab? "current" : ""}`} key = {i}>
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