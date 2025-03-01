import React from "react";

interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    state: string;
    updateState: any;
}
export default function InputBox(props: InputBoxProps) {
    return (
        <input {...props} className = {`input-box ${props.className}`} value = {props.state} onChange = {e => props.updateState(e.target.value)} />
    );
}