import { useEffect, useRef } from "react";
import styles from "../styles/Skills.module.scss";
import { SkillGrid } from "./SkillGrid";

const Skills = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    /*useEffect(()=>{
        const flicker = setInterval(()=>{
            const rand = Math.random();
            if(rand > .90){                
                wrapperRef.current?.animate([
                    {transform: "skewX(0)"},
                    {transform: rand>.95?"skewX(-15deg)":"skew(15deg)"},
                    {transform: "skewX(0)"},                    
                ],{duration:25})
            }
        },300)
        return ()=> clearInterval(flicker);
    },[])*/
    
    return (
        <article id="skills" className={styles.wrapper}>
            <h2 className={styles.hero}>Frequently Used Tech</h2>
            <div className={styles.gridWrapper} ref={wrapperRef}>
                <SkillGrid />
                <div className={styles.distortedGrid}>
                    <SkillGrid />
                </div>
            </div>
        </article>
    )
}

export { Skills };