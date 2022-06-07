import { Selection } from "./NavCarrot";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useIsomorphicLayoutEffect } from "../hooks/useIsomorphicLayoutEffect";

import { NavDesktop } from "./NavDesktop";
import { NavMobile } from "./NavMobile";


const NavBar = (): JSX.Element => {
    const router = useRouter();
    const [currentLoc, setCurrentLoc] = useState<Selection | null>(null);
    const [showMobile, setShowMobile] = useState<boolean>(false);

    const determineLayout = () => {
        const mobileBreakPoint = 650;
        setShowMobile(window.innerWidth < mobileBreakPoint);
    }

    useIsomorphicLayoutEffect(() => {
        determineLayout();
        window.addEventListener("resize", determineLayout);
        return () => window.addEventListener("resize", determineLayout);
    }, [])

    useEffect(() => {
        if (router.asPath.includes("home")) {
            setCurrentLoc(Selection.HOME);
        } else if (router.asPath.includes("skills")) {
            setCurrentLoc(Selection.SKILLS);
        } else if (router.asPath.includes("projects")) {
            setCurrentLoc(Selection.PROJECTS);
        } else if (router.asPath.includes("contact")) {
            setCurrentLoc(Selection.CONTACT);
        } else {
            setCurrentLoc(Selection.HOME);
        }
    }, [router.asPath])

    return showMobile ? <NavMobile currentLoc={currentLoc} /> : <NavDesktop currentLoc={currentLoc} />;
}

export { NavBar };