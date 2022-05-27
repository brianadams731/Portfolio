import { NavBar } from "./NavBar";

interface LayoutProps{
    children: JSX.Element
}

const NavLayout = ({ children }:LayoutProps):JSX.Element => {
    return (
        <>
            <NavBar />
            <main>{children}</main>
        </>
    )
}

export { NavLayout };