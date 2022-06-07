import { Carrot, Selection } from "./NavCarrot"
import { useState } from "react";

import styles from "../styles/NavMobile.module.scss";
import Link from "next/link";

interface Props {
    currentLoc: Selection | null;
}

const NavMobile = ({ currentLoc }: Props): JSX.Element => {
    enum MenuState {
        INITIAL,
        OPEN,
        CLOSING,
        CLOSED
    }

    const [menuState, setMenuState] = useState<MenuState>(MenuState.INITIAL);
    const [canToggle, setCanToggle] = useState<boolean>(true);

    const determineHamburgerAnimation = (position: "top"|"middle"|"bottom"):string =>{
        if(menuState === MenuState.OPEN){
            return styles[`${position}Open`]
        }else if(menuState === MenuState.CLOSING){
            return styles[`${position}Close`]
        }else{
            return "";
        }
    }
    
    const determineBackgroundAnimation = ():string =>{
        if(menuState === MenuState.OPEN){
            return styles.fadeIn;
        }else if(menuState === MenuState.CLOSING){
            return styles.fadeOut;
        }else{
            return "";
        }
    }

    const determineMenuAnimation = ():string =>{
        if(menuState === MenuState.OPEN){
            return styles.slideIn;
        }else if(menuState === MenuState.CLOSING){
            return styles.slideOut;
        }else{
            return "";
        }
    }
    
    return (
        <>
            <div className={styles.hamburgerWrapper} onClick={()=>{
                if(!canToggle){
                    return;
                }
                if(menuState === MenuState.INITIAL || menuState === MenuState.CLOSED){
                    setMenuState(MenuState.OPEN);
                }else if(menuState === MenuState.OPEN){
                    setMenuState(MenuState.CLOSING);
                }
            }}>
                <div className={`${styles.topLine} ${determineHamburgerAnimation("top")}`} 
                    onAnimationStart={()=>setCanToggle(false)} onAnimationEnd={()=>setCanToggle(true)}></div>
                <div className={`${styles.middleLine} ${determineHamburgerAnimation("middle")}`}></div>
                <div className={`${styles.bottomLine} ${determineHamburgerAnimation("bottom")}`}></div>                
            </div>

            {(menuState === MenuState.OPEN || menuState === MenuState.CLOSING) &&
                <div className={`${styles.menuBackground} ${determineBackgroundAnimation()}`} onClick={()=>{
                    if(!canToggle){
                        return;
                    }
                    setMenuState(MenuState.CLOSING);
                }} onAnimationEnd={(e)=>{
                    if(e.animationName.includes("middleOpen")){                        
                        setMenuState(MenuState.CLOSED);
                    }
                }}>

                    <div className={`${styles.menuWrapper} ${determineMenuAnimation()}`} onClick={(e)=>e.stopPropagation()}>
                        <ul>
                            <span onClick={()=>setMenuState(MenuState.CLOSING)}>{currentLoc === Selection.HOME && <Carrot />}<Link href="#home"><li>Home</li></Link></span>
                            <span onClick={()=>setMenuState(MenuState.CLOSING)}>{currentLoc === Selection.SKILLS && <Carrot />}<Link href="#skills"><li>Skills</li></Link></span>
                            <span onClick={()=>setMenuState(MenuState.CLOSING)}>{currentLoc === Selection.PROJECTS && <Carrot />}<Link href="#projects"><li>Projects</li></Link></span>
                            <span onClick={()=>setMenuState(MenuState.CLOSING)}>{currentLoc === Selection.CONTACT && <Carrot />}<Link href="#contact"><li>Contact</li></Link></span>
                        </ul>
                    </div>
                </div>
            }
        </>
    )
}

export { NavMobile };