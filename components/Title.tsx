import { GlitchedText } from "./GlitchedText";

import styles from "../styles/Title.module.scss";
import { Terrain } from "./Terrain";

const Title = ():JSX.Element =>{
    return (
        <div className={styles.outerWrapper}>
            <Terrain />
            <section className={styles.wrapper}>
                <GlitchedText text="Brian Adams" />
                <h5>Web Application Developer</h5>
            </section>
        </div>
    )
}

export {Title};