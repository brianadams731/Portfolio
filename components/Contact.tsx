import { AsciiArt, AsciiArtSelection } from "./AsciiArt"

import styles from "../styles/Contact.module.scss";
import { useExecuteWhenInView } from "../hooks/useExecuteWhenInView";
import { useEffect, useRef, useState } from "react";
import { TerminalInput } from "./TerminalInput";

enum Animate{
    NONE = 0,
    CMD_CURL = 1,
    HEADER = 2,
    REQUEST = 3,
    DATA = 4,

    SENDER_EMAIL = 5,
    SENDER_NAME = 6,
    MESSAGE = 7,

    ENDPOINT = 8,

    SEND = 9,
}

const Contact = () => {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const [currentAnimation, setCurrentAnimation] = useState<Animate>(Animate.NONE);
    const [executeInView] = useExecuteWhenInView(()=>{
        setTimeout(()=>{
            setCurrentAnimation(Animate.CMD_CURL);
        },750)
    }, .3, true);
    
    const determineVisibility = (animateValue: Animate) =>{
        return animateValue<=currentAnimation?styles.visible:styles.hidden
    }
    const determineCursor = (animateValue: Animate) =>{
        return animateValue === currentAnimation?styles.cursorSpan:"";
    }
    const generateTypedAnimation = (stepsCount: number, animateValue:Animate):string|undefined =>{
        if(animateValue> currentAnimation){
            return;
        }
        const timePerCharacter = 0.055;
        const animationTime = stepsCount * timePerCharacter;
        return `typeIn ${animationTime}s steps(${stepsCount}, end) forwards`;
    }

    const triggerNextAnimation = (event: any, animationToTrigger:Animate) =>{
        if(event.animationName === "typeIn"){
            setTimeout(()=>{
                setCurrentAnimation(animationToTrigger);
            }, 450)
        }
    }

    return (
        <article id="contact" className={styles.wrapper} ref={executeInView}>
            <AsciiArt selection={AsciiArtSelection.CONTACT}/>
            <form className={styles.form} onSubmit={(e)=>{
                e.preventDefault();
                if(!email || !name || !message){
                    return;
                }
                console.log(email);
                console.log(name);
                console.log(message);
            }}>
                <p>
                    <span></span>
                    {"[brian@portfolio]$ curl"}
                </p>
                
                <p>
                    <span></span>
                    {'--header "Content-Type: application/json"'}
                </p>

                <p>
                    <span></span>
                    {'--request POST'}
                </p>
                <p>
                    <span></span>
                    {`--data '{`}
                </p>

                <p>
                    <>&emsp;&emsp;</>
                    <span></span>
                    {'"sender_email":'}"<TerminalInput defaultText="your email here" getInputVal={setEmail} />"    
                </p>
                <p>
                    <>&emsp;&emsp;</>
                    <span></span>
                    {'"sender_name":'}"<TerminalInput defaultText="your name here" getInputVal={setName} />"    
                </p>
                <p>
                    <>&emsp;&emsp;</>
                    <span></span>
                    {'"message":'}"<TerminalInput defaultText="your message here" getInputVal={setMessage} />"    
                </p>

                <p>
                    <span></span>
                    {`}' /api/messages`}
                </p>

                <button className={styles.sendMessage} type="submit">{"[brian@portfolio]$ SEND MESSAGE"}</button>
            </form>
        </article>
    )
}

export { Contact }