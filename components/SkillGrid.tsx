import { TechUsed } from "./TechUsed";

import styles from '../styles/SkillGrid.module.scss';

const SkillGrid = () => {
    return (
        <section className={styles.wrapper}>
            <TechUsed name="typescript" />
            <TechUsed name="next" />
            <TechUsed name="react" />
            <TechUsed name="redux" />


            <TechUsed name="node" />
            <TechUsed name="express" />
            <TechUsed name="jest" />
            <TechUsed name="postgres" />

            <TechUsed name="html" />
            <TechUsed name="css" />
            <TechUsed name="scss" />

            <TechUsed name="python" />
            <TechUsed name="flask" />

            <TechUsed name="java" />
            <TechUsed name="git" />
        </section>
    )
}

export { SkillGrid }; 