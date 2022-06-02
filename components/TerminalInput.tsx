import { Dispatch, SetStateAction, useRef } from "react";

import styles from "../styles/TerminalInput.module.scss";

interface Props {
    defaultText: string;
    getInputVal: Dispatch<SetStateAction<string>>;
}

const TerminalInput = ({ defaultText, getInputVal }: Props): JSX.Element => {
    const inputRef = useRef<HTMLSpanElement>(null);
    const defaultTextRef = useRef<HTMLSpanElement>(null);

    const blur = ()=>{
        if (!defaultTextRef.current || !inputRef.current) {
            return;
        }       
        if (inputRef.current.innerText === "") {
            defaultTextRef.current.innerText = defaultText;
        }
    }
    const focus = () =>{
        if (!defaultTextRef.current || !inputRef.current) {
            return;
        }
        if (inputRef.current.innerText === "") {
            defaultTextRef.current.innerText = "";
        }
        inputRef.current.focus();
    }

    return (
        <>
            <span ref={inputRef} className={styles.input} contentEditable onFocus={focus} onBlur={blur} onKeyDown={(e)=>{
                if(e.key === "Enter"){
                    e.preventDefault();
                }
            }} onKeyUp={(e)=>{

                const element = e.target as HTMLSpanElement;
                getInputVal(element.innerText);
            }}></span>
            <span className={styles.defaultText} ref={defaultTextRef} onFocus={focus} onBlur={blur} tabIndex={-1}>{defaultText}</span>
        </>
    )
}

export { TerminalInput };
