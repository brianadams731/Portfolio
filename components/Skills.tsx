import styles from "../styles/Skills.module.scss";
import { AsciiArt, AsciiArtSelection } from "./AsciiArt";
import { SkillGrid } from "./SkillGrid";

const Skills = () => {
    
    return (
        <article id="skills" className={styles.wrapper}>
            <AsciiArt selection={AsciiArtSelection.SKILLS} />
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