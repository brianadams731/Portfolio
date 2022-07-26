import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

interface LayoutProps{
    children: JSX.Element
}

const NavLayout = ({ children }:LayoutProps):JSX.Element => {
    return (
        <>
            <NavBar />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export { NavLayout };