import { useEffect } from "react";
import styles from "../styles/ProjectTech.module.scss";
import { TechUsed } from "./TechUsed";

interface Props {
    names: string[]
}

const ProjectTech = ({ names }: Props): JSX.Element => {
    useEffect(() => {
        console.log(names);
    }, [])

    return (
        <section className={styles.wrapper}>
            {names.map(item => {
                return (
                    <div key={item} className={styles.itemWrapper}>
                        <TechUsed name={item} />
                    </div>
                )
            })}
        </section>
    )
}

export { ProjectTech };