import React from "react";

interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    state: string;
    setState: any;
}
export default function InputBox(props: InputBoxProps) {
    return (
        <input className = {`input-box ${props.className}`} value = {props.state} onChange = {e => props.setState(e.target.value)} />
    );
}