import { GlitchedText } from "./GlitchedText";

import styles from "../styles/Title.module.scss";

const Title = ():JSX.Element =>{
    return (
        <div className={styles.outterWrapper}>
            <section className={styles.wrapper}>
                <GlitchedText text="Brian Adams" />
                <h5>Web App Developer</h5>
            </section>
        </div>
    )
}

export {Title};