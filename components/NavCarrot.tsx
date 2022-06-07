import styles from "../styles/Carrot.module.scss";

enum Selection {
    HOME,
    SKILLS,
    PROJECTS,
    CONTACT
}

const Carrot = () => {
    return (
        <>
            <div className={styles.carrotTop}></div>
            <div className={styles.carrotBottom}></div>
        </>
    )
}

export { Carrot, Selection };
