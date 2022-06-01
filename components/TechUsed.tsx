import Image from "next/image";
import { noLoad } from "../utils/imgLoaders";
import styles from "../styles/TechUsed.module.scss";
import { useEffect, useRef } from "react";
import { useTech } from "../hooks/useTech";

interface Props{
    name: string;
    hideTitle?:boolean;
}


const TechUsed = ({name, hideTitle}:Props):JSX.Element => {
    const [ref] = useTech();
    const wrapperRef = useRef<HTMLDivElement>(null);
    
    useEffect(()=>{        
        const flicker = setInterval(()=>{
            const rand = Math.random();
            if(rand > .98){                
                wrapperRef.current?.animate([
                    {transform: "skewX(0)"},
                    {transform: rand>.98?"skewX(-28deg)":"skew(28deg)"},
                    {transform: "skewX(0)"},                    
                ],{duration:28})
            }
        },300)
        return ()=> clearInterval(flicker);
    },[])

    if(!ref.current[name]?.imgURL){
        return <div>{name}</div>
    }
    return(
        <div className={styles.wrapper} ref={wrapperRef}>
            <div className={styles.imgWrapper}>
                <Image layout="fill" objectFit="contain" src={ref.current[name]?.imgURL} loader={noLoad} className={styles.imgOne} alt={ref.current[name]?.title} unoptimized />
            </div>
            {!hideTitle &&
                <h5>{ref.current[name]?.title}</h5>
            }
        </div>
    )
}

export { TechUsed }