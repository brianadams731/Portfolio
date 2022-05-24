import Image from "next/image";
import { noLoad } from "../utils/imgLoaders";
import styles from "../styles/TechUsed.module.scss";

interface Props{
    imgURL:string;
    name: string;
}

const TechUsed = ({imgURL, name}:Props):JSX.Element => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.imgWrapper}>
                <Image layout="fill" src={imgURL} loader={noLoad} className={styles.imgOne} />
                <div className={styles.imgTwo}>
                    <div className={styles.filler}></div>
                    <Image layout="fill" src={imgURL} loader={noLoad} className={styles.imgTwo} />
                </div>
            </div>
            <h5>{name}</h5>
        </div>
    )
}

export { TechUsed }