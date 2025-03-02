import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger
} from "../ui/menubar.tsx";
import {MenuIcon} from "lucide-react";
import {NavLink, useLocation} from "react-router";


const NavMenu = () => {
    const location = useLocation();

    return (
        <div className="p-2 md:hidden rounded-lg transition-colors cursor-pointer">
            <Menubar className="dark:border dark:border-neutral-200 dark:hover:bg-neutral-800 ">
                <MenubarMenu>
                    <MenubarTrigger>
                        <MenuIcon className="w-5 h-5 dark:text-neutral-100"/>
                    </MenubarTrigger>
                    <MenubarContent align="end" alignOffset={5} className="border mt-2 bg-white/60 backdrop-blur-lg ">
                        <MenubarItem className={location.pathname === "/" ? `bg-neutral-100` : ""}
                        >
                            <NavLink to="/">About</NavLink>
                        </MenubarItem>
                        <MenubarItem
                            className={location.pathname === "/works" ? "bg-neutral-100" : ""}
                        >
                            <NavLink to="/works">Works</NavLink>
                        </MenubarItem>
                        <MenubarItem
                            className={location.pathname === "/posts" ? "bg-neutral-100" : ""}
                        >
                            <NavLink to="/posts">Posts</NavLink>
                        </MenubarItem>
                        <MenubarItem>
                            <a
                                href="https://github.com/ensorceler"
                                target="_blank"
                                rel="noopener noreferrer">
                                Github
                            </a>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    )
}

export default NavMenu;