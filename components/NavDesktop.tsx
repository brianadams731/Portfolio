import { Carrot, Selection } from "./NavCarrot"
import Link from "next/link"

import styles from "../styles/NavDesktop.module.scss";

interface Props {
    currentLoc: Selection|null;
}

const NavDesktop = ({ currentLoc }: Props):JSX.Element => {
    return (
        <header className={styles.wrapper}>
            <ul>
                <span>{currentLoc === Selection.HOME && <Carrot />}<Link href="#home"><li>Home</li></Link></span>
                <span>{currentLoc === Selection.SKILLS && <Carrot />}<Link href="#skills"><li>Skills</li></Link></span>
                <span>{currentLoc === Selection.PROJECTS && <Carrot />}<Link href="#projects"><li>Projects</li></Link></span>
                <span>{currentLoc === Selection.CONTACT && <Carrot />}<Link href="#contact"><li>Contact</li></Link></span>
            </ul>
        </header>
    )
}

export { NavDesktop };