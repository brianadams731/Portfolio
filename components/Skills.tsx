import { useEffect, useRef } from "react";
import styles from "../styles/Skills.module.scss";
import { SkillGrid } from "./SkillGrid";

const Skills = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        const flicker = setInterval(()=>{
            const rand = Math.random();
            if(rand > .93){                
                wrapperRef.current?.animate([
                    {transform: "skewX(0)"},
                    {transform: "skewX(-50deg)"},
                    {transform: "skewX(0)"},                    
                ],{duration:20})
            }
        },300)
        return ()=> clearInterval(flicker);
    },[])
    return (
        <article className={styles.wrapper} ref={wrapperRef}>
            <h2 className={styles.hero}>Frequently Used Tech</h2>
            <div className={styles.gridWrapper}>
                <SkillGrid />
                <div className={styles.distortedGrid}>
                    <SkillGrid />
                </div>
            </div>
        </article>
    )
}

export { Skills };