import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/NavBar.module.scss";

const Carrot = () => {
    return (
        <>
            <div className={styles.carrotTop}></div>
            <div className={styles.carrotBottom}></div>
        </>
    )
}

enum Selection {
    HOME,
    SKILLS,
    PROJECTS,
    CONTACT
}

const NavBar = (): JSX.Element => {
    const router = useRouter();
    const [currentLoc, setCurrentLoc] = useState<Selection | null>(null);

    useEffect(() => {
        if (router.asPath.includes("home")) {
            setCurrentLoc(Selection.HOME);
        } else if (router.asPath.includes("skills")) {
            setCurrentLoc(Selection.SKILLS);
        } else if (router.asPath.includes("projects")) {
            setCurrentLoc(Selection.PROJECTS);
        } else if (router.asPath.includes("contact")) {
            setCurrentLoc(Selection.CONTACT);
        }else{
            setCurrentLoc(Selection.HOME);
        }
    }, [router.asPath])

    return (
        <header className={styles.wrapper}>
            <ul>
                <span>{currentLoc===Selection.HOME &&<Carrot />}<Link href="#home"><li className={styles.carrot}>Home</li></Link></span>
                <span>{currentLoc===Selection.SKILLS &&<Carrot />}<Link href="#skills"><li>Skills</li></Link></span>
                <span>{currentLoc===Selection.PROJECTS &&<Carrot />}<Link href="#projects"><li>Projects</li></Link></span>
                <span>{currentLoc===Selection.CONTACT &&<Carrot />}<Link href="#contact"><li>Contact</li></Link></span>
            </ul>
        </header>
    )
}

export { NavBar };