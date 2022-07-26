import { AsciiArt, AsciiArtSelection } from "./AsciiArt"

import styles from "../styles/Contact.module.scss";
import { useExecuteWhenInView } from "../hooks/useExecuteWhenInView";
import { useState } from "react";
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

    const [submitted, setSubmitted] = useState<boolean>(false);

    const [currentAnimation, setCurrentAnimation] = useState<Animate>(Animate.NONE);
    const [executeInView] = useExecuteWhenInView(()=>{
        setTimeout(()=>{
            setCurrentAnimation(Animate.CMD_CURL);
        },750)
    }, .2, true);
    
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
        const timePerCharacter = 0.038;
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
            <form className={styles.form} onSubmit={async (e)=>{
                e.preventDefault();
                if(!email || !name || !message){
                    return;
                }
                const res = await fetch("/api/message", {
                    method: "POST",
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        name,
                        message
                    }),
                })
                if(res.ok){
                    setSubmitted(true);
                }else{
                    console.log(res);
                }

            }}>
                <p className={determineVisibility(Animate.NONE)}>
                    {"[brian@portfolio]$ "}
                    <span className={styles.wrapperSpan}>
                        <span className={determineCursor(Animate.NONE) || determineCursor(Animate.CMD_CURL)} style={{animation:generateTypedAnimation((4), Animate.CMD_CURL)}} onAnimationEnd={(e)=>{triggerNextAnimation(e,Animate.HEADER)}}></span>
                        {"curl"}
                    </span>
                </p>
                
                <p className={determineVisibility(Animate.HEADER)}>
                    <span className={styles.wrapperSpan}>
                        <span className={determineCursor(Animate.HEADER)} style={{animation:generateTypedAnimation((41), Animate.HEADER)}} onAnimationEnd={(e)=>{triggerNextAnimation(e,Animate.REQUEST)}}></span>
                        {'--header "Content-Type: application/json"'}
                    </span>
                </p>

                <p className={determineVisibility(Animate.REQUEST)}>
                    <span className={styles.wrapperSpan}>
                        <span className={determineCursor(Animate.REQUEST)} style={{animation:generateTypedAnimation((14), Animate.REQUEST)}} onAnimationEnd={(e)=>{triggerNextAnimation(e,Animate.DATA)}}></span>
                        {'--request POST'}
                    </span>
                </p>

                <p className={determineVisibility(Animate.DATA)}>
                    <span className={styles.wrapperSpan}>
                        <span className={determineCursor(Animate.DATA)} style={{animation:generateTypedAnimation((9), Animate.DATA)}} onAnimationEnd={(e)=>{triggerNextAnimation(e,Animate.ENDPOINT)}}></span>
                        {`--data '{`}
                    </span>
                </p>

                <p className={determineVisibility(Animate.SENDER_EMAIL)}>
                    <>&emsp;&emsp;</>
                    <span className={styles.wrapperSpan}>
                        <span></span>
                        {'"sender_email": "'}<TerminalInput defaultText="your email here" getInputVal={setEmail} submitted={submitted} setSubmitted={setSubmitted} />{'"'}    
                    </span>
                </p>

                <p className={determineVisibility(Animate.SENDER_NAME)}>
                    <>&emsp;&emsp;</>
                    <span className={styles.wrapperSpan}>
                        <span></span>
                        {'"sender_name": "'}<TerminalInput defaultText="your name here" getInputVal={setName} submitted={submitted} setSubmitted={setSubmitted} />{'"'}    
                    </span>
                </p>

                <p className={determineVisibility(Animate.MESSAGE)}>
                    <>&emsp;&emsp;</>
                    <span>
                        <span></span>
                        {'"message": "'}<TerminalInput defaultText="your message here" getInputVal={setMessage} submitted={submitted} setSubmitted={setSubmitted} />{'"'}    
                    </span>
                </p>

                <p className={determineVisibility(Animate.ENDPOINT)}>
                    <span className={styles.wrapperSpan}>
                        <span className={determineCursor(Animate.ENDPOINT)} style={{animation:generateTypedAnimation((9), Animate.ENDPOINT)}} onAnimationEnd={(e)=>{triggerNextAnimation(e,Animate.SEND)}}></span>
                        {`}' /api/messages`}
                    </span>
                </p>

                <button className={`${styles.sendMessage} ${determineVisibility(Animate.SEND)}`} type="submit">{"[brian@portfolio]$ SEND MESSAGE"}</button>
            </form>
        </article>
    )
}

export { Contact }