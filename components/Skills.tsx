import styles from "../styles/Skills.module.scss";
import { SkillGrid } from "./SkillGrid";

const Skills = () => {
    
    return (
        <article id="skills" className={styles.wrapper}>
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