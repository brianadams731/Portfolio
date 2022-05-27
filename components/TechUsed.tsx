import Image from "next/image";
import { noLoad } from "../utils/imgLoaders";
import styles from "../styles/TechUsed.module.scss";
import { useEffect, useRef } from "react";

interface Props{
    imgURL:string;
    name: string;
}

const TechUsed = ({imgURL, name}:Props):JSX.Element => {
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

    return(
        <div className={styles.wrapper} ref={wrapperRef}>
            <div className={styles.imgWrapper}>
                <Image layout="fill" src={imgURL} loader={noLoad} className={styles.imgOne} unoptimized />
            </div>
            <h5>{name}</h5>
        </div>
    )
}

export { TechUsed }